namespace Backend.Models;

public class Settings
{
    public WikipediaSettings? WikipediaSettings { get; set; }
}

public class WikipediaSettings
{
    public string? BaseUrl { get; set; }
}