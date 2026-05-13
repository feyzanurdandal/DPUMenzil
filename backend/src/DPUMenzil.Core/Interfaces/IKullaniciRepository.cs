using DPUMenzil.Core.Entities;

namespace DPUMenzil.Core.Interfaces;

public interface IKullaniciRepository
{
    Task<Kullanici?> GetByIdAsync(Guid id);
    Task<Kullanici?> GetByEmailAsync(string email);
    Task AddAsync(Kullanici kullanici);
    // İleride gerekirse Update ve Delete de ekleriz
}