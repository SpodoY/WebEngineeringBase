using Backend.Endpoints;
using Backend.Models;
using Backend.Services;
using Backend.Services.Interfaces;
using Scalar.AspNetCore;

#region AppParams

var corsPolicyName = "_corsPolicy";

#endregion

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Registers the Settings Object for DI using the "pool" of Configurations available
// for example Secrets.json, appsettings.json or any other like azure app config, etc.
var config = builder.Configuration;

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicyName,
        policy =>
        {
            policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
        });
});

builder.Services.Configure<WikipediaSettings>(config.GetSection("WikipediaSettings"));

builder.Services.AddScoped<IBearService, BearService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseCors(corsPolicyName);

app.UseHttpsRedirection();

// Map MinimalApi Endpoints through extension methods by first registering /api/v1 as base Path and then using
// `MapBearWikiEndpoints` to register endpoints defined in there resulting in /api/v1/bears
var apiV1 = app.MapGroup("/api/v1");
apiV1.MapBearWikiEndpoints();

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