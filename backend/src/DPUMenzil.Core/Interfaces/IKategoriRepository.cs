using DPUMenzil.Core.Entities;

namespace DPUMenzil.Core.Interfaces;

public interface IKategoriRepository
{
    Task<IEnumerable<Kategori>> GetAllAsync();
    Task<Kategori?> GetByIdAsync(Guid id);
}