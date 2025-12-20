using System.Text.Json.Serialization;

namespace Backend.Models.DTO;

public class BearResponseDTO
{
    [JsonPropertyName("parse")] public Parse Parse { get; set; }
}

public class Parse
{
    [JsonPropertyName("title")] public string Title { get; set; }

    [JsonPropertyName("pageid")] public int Pageid { get; set; }

    [JsonPropertyName("wikitext")] public Wikitext Wikitext { get; set; }
}

public class Wikitext
{
    [JsonPropertyName("*")] public string Content { get; set; }
}