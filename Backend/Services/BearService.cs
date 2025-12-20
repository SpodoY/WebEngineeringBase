using System.Text.Json;
using System.Text.RegularExpressions;
using Backend.Models;
using Backend.Models.DTO;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;

namespace Backend.Services;

public class BearService : IBearService
{
    private readonly ILogger<BearService> _logger;
    private readonly WikipediaSettings _wikiSettings;
    private readonly HttpClient _httpClient;

    public BearService(ILogger<BearService> logger, IOptions<WikipediaSettings> wikiSettings)
    {
        _logger = logger;
        _wikiSettings = wikiSettings.Value;
        
        if (string.IsNullOrWhiteSpace(_wikiSettings.BaseUrl))
            throw new InvalidOperationException("Wikipedia BaseUrl is not configured");

        _httpClient = new HttpClient()
        {
            BaseAddress = new Uri(_wikiSettings.BaseUrl),
            Timeout = TimeSpan.FromSeconds(30)
        };
        
        _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("WebEngineeringProject/1.0 (thomas.winter@stud.hcw.ac.at)");
    }

    public async Task<IList<Bear>?> GetBears()
    {
        // Utilizing the QueryHelpers Class below so we make a dict for all query params.
        var query = new Dictionary<string, string>()
        {
            { "action", "parse" },
            { "page", "List_of_ursids"},
            { "prop", "wikitext" },
            { "section", "3" },
            { "format", "json" },
            { "origin", "*" }
        };

        try
        {
            var bearsResponse = await _httpClient.GetFromJsonAsync<BearResponseDTO>("https://en.wikipedia.org/w/api.php?action=parse&page=List_of_ursids&prop=wikitext&section=3&format=json");
            //     QueryHelpers.AddQueryString("", query!)
            // );

            if (bearsResponse is null)
            {
                return null;
            }

            var bears = await ExtractBears(bearsResponse);
            return bears;
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Fetching bears failed");
            return null;
        }
    }

    private async Task<IList<Bear>?> ExtractBears(BearResponseDTO bearsResponse)
    {
        var wikiText = bearsResponse.Parse.Wikitext.Content;

        string[] speciesTable = wikiText.Split("{{Species table/end}}");
        IList<Bear> bears = [];

        foreach (var species in speciesTable)
        {
            var rows = species.Split("{{Species table/row}}");

            foreach (var bearRow in rows)
            {
                var bear = await ExtractBear(bearRow);
                if (bear != null) bears.Add(bear);
            }
        }

        return bears;
    }

    private async Task<Bear?> ExtractBear(string bear)
    {
        var nameMatch = Regex.Match(bear, @"\|name=\[\[(.*?)\]\]");
        var binomialMatch = Regex.Match(bear, @"\|binomial=(.*?)\n");
        var imageMatch = Regex.Match(bear, @"\|image=(.*?)\n");
        var imageAltMatch = Regex.Match(bear, @"\|image-alt=(.*?)\n");
        var rangeMatch = Regex.Match(bear, @"\|range=([^|\n]*)");
        var rangeImgMatch = Regex.Match(bear, @"\|range-image=([^|\n]*)");

        if (
            nameMatch.Success &&
            binomialMatch.Success &&
            imageMatch.Success &&
            imageAltMatch.Success &&
            rangeMatch.Success &&
            rangeImgMatch.Success
        )
        {
            try
            {
                var fileName = imageMatch.Groups[1].Value
                    ?.Trim()
                    .Replace("File:", "");

                var rangeFileName = rangeImgMatch.Groups[1].Value
                    ?.Trim()
                    .Replace("File:", "");

                var imgAltDesc = imageAltMatch.Groups[1].Value?.Trim();

                string? imgUrl = null;
                string? rangeImgUrl = null;

                // If you want to see a raccoon... just replace the assignment to null here ;)
                if (!string.IsNullOrWhiteSpace(fileName))
                    imgUrl = await FetchImageFromUrl(fileName);

                if (!string.IsNullOrWhiteSpace(rangeFileName))
                    rangeImgUrl = await FetchImageFromUrl(rangeFileName);

                return new Bear
                {
                    Name = nameMatch.Groups[1].Value ?? string.Empty,
                    Binomial = binomialMatch.Groups[1].Value ?? string.Empty,
                    Image = new BearImg
                    {
                        Url = imgUrl ?? "",
                        AltText = imgAltDesc ?? string.Empty
                    },
                    Range = new BearRange
                    {
                        Url = rangeImgUrl,
                        Description = rangeMatch.Groups[1].Value ?? string.Empty
                    }
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to process bear data for {bear}: {ex.Message}");
            }
        }

        return null;
    }

    private async Task<string?> FetchImageFromUrl(string fileName)
    {
        // Utilizing the QueryHelpers Class below so we make a dict for all query params.
        var query = new Dictionary<string, string>()
        {
            ["action"] = "query",
            ["titles"] = $"File:{fileName}",
            ["prop"] = "imageinfo",
            ["iiprop"] = "url",
            ["format"] = "json",
            ["origin"] = "*"
        };

        var response = await _httpClient.GetAsync(QueryHelpers.AddQueryString("", query!));

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception(
                $"Wikipedia API returned status {(int)response.StatusCode}: {response.ReasonPhrase}");
        }
        
        // If you look at the response it's so weird that instead of making a responseDTO, I just json Parse-Magiced it...
        // Like who the fuck returns a "-1" as an object, wrapping this 7 times???
        var stream = await response.Content.ReadAsStreamAsync();
        var document = await JsonDocument.ParseAsync(stream);
        
        var root = document.RootElement;
        
        if (root.TryGetProperty("error", out _))
        {
            throw new Exception("Wikipedia API returned an error response");
        }

        if (!root.TryGetProperty("query", out var queryElement) ||
            !queryElement.TryGetProperty("pages", out var pagesElement))
        {
            return null;
        }
        
        // pages is an object keyed by pageId → take first value (same as Object.values()[0])
        foreach (var pageProperty in pagesElement.EnumerateObject())
        {
            var page = pageProperty.Value;

            if (page.TryGetProperty("imageinfo", out var imageInfoArray) &&
                imageInfoArray.GetArrayLength() > 0 &&
                imageInfoArray[0].TryGetProperty("url", out var urlElement))
            {
                return urlElement.GetString();
            }

            break;
        }

        return null;
    }
}