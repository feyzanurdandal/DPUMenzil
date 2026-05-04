using DPUMenzil.Core.Entities;
using DPUMenzil.Core.Interfaces;
using DPUMenzil.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace DPUMenzil.Infrastructure.Repositories;

public class KategoriRepository : IKategoriRepository
{
    private readonly AppDbContext _context;

    public KategoriRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Kategori>> GetAllAsync()
    {
        return await _context.Kategoriler.ToListAsync();
    }

    public async Task<Kategori?> GetByIdAsync(Guid id)
    {
        return await _context.Kategoriler.FindAsync(id);
    }
}