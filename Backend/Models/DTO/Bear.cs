using System.Text.Json.Serialization;

namespace Backend.Models.DTO;

public record Bear
{
    [JsonPropertyName("name")] public string Name { get; set; }
    [JsonPropertyName("binomial")] public string Binomial { get; set; }
    [JsonPropertyName("image")] public BearImg Image { get; set; }
    [JsonPropertyName("range")] public BearRange Range { get; set; }
}

public record BearImg
{
    [JsonPropertyName("url")] public string Url { get; set; }
    [JsonPropertyName("alt")] public string AltText { get; set; }
}

public record BearRange
{
    [JsonPropertyName("url")] public string Url { get; set; }

    [JsonPropertyName("desc")] public string Description { get; set; }
}