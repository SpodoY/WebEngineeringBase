using Backend.Models.DTO;

namespace Backend.Services.Interfaces;

public interface IBearService
{
    public Task<IList<Bear>?> GetBears();
}