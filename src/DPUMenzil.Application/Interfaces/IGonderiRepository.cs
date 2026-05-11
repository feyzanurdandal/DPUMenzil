using DPUMenzil.Core.Entities;

namespace DPUMenzil.Core.Interfaces;

public interface IGonderiRepository
{
    Task<Gonderi?> GetByIdAsync(Guid id);
    Task<IEnumerable<Gonderi>> GetAllAsync();
    Task<IEnumerable<Gonderi>> GetByKategoriAsync(Guid kategoriId);
    Task AddAsync(Gonderi gonderi);
    Task UpdateAsync(Gonderi gonderi);
    Task DeleteAsync(Guid id);
}