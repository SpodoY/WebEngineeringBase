using Backend.Models.DTO;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Backend.Endpoints;

public static class BearWikiEndpoints
{
    public static void MapBearWikiEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder.MapGroup("/bears").WithTags("Bears");

        group.MapGet("/", async (IBearService bearService) =>
        {
            var bears = await bearService.GetBears();
            return TypedResults.Ok(bears);
        });
    }
}