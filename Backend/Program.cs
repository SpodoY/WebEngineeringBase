using Backend.Endpoints;
using Backend.Models;
using Backend.Services;
using Backend.Services.Interfaces;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Registers the Settings Object for DI using the "pool" of Configurations available
// for example Secrets.json, appsettings.json or any other like azure app config, etc.
var config = builder.Configuration;

var section = config.GetSection("WikipediaSettings");

builder.Services.Configure<WikipediaSettings>(config.GetSection("WikipediaSettings"));

builder.Services.AddScoped<IBearService, BearService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

// Map MinimalApi Endpoints through extension methods
app.MapBearWikiEndpoints();

// Left in starter code to showcase how this can be done
// app.MapGet("/weatherforecast", () =>
//     {
//         var forecast = Enumerable.Range(1, 5).Select(index =>
//                 new WeatherForecast
//                 (
//                     DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
//                     Random.Shared.Next(-20, 55),
//                     summaries[Random.Shared.Next(summaries.Length)]
//                 ))
//             .ToArray();
//         return forecast;
//     })
//     .WithName("GetWeatherForecast");

app.Run();

// record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
// {
//     public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
// }