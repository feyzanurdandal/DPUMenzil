using DPUMenzil.Core.Entities;
using DPUMenzil.Core.Interfaces;
using DPUMenzil.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace DPUMenzil.Infrastructure.Repositories;

public class GonderiRepository : IGonderiRepository
{
    private readonly AppDbContext _context;

    public GonderiRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Gonderi?> GetByIdAsync(Guid id)
    {
        return await _context.Gonderiler
            .Include(g => g.OlusturanKullanici)
            .Include(g => g.Kategori)
            .FirstOrDefaultAsync(g => g.Id == id);
    }

    public async Task<IEnumerable<Gonderi>> GetAllAsync()
    {
        return await _context.Gonderiler
            .Include(g => g.OlusturanKullanici)
            .Include(g => g.Kategori)
            .OrderByDescending(g => g.OlusturulmaTarihi)
            .ToListAsync();
    }

    public async Task<IEnumerable<Gonderi>> GetByKategoriAsync(Guid kategoriId)
    {
        return await _context.Gonderiler
            .Where(g => g.KategoriId == kategoriId)
            .Include(g => g.OlusturanKullanici)
            .OrderByDescending(g => g.OlusturulmaTarihi)
            .ToListAsync();
    }

    public async Task AddAsync(Gonderi gonderi)
    {
        await _context.Gonderiler.AddAsync(gonderi);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Gonderi gonderi)
    {
        _context.Gonderiler.Update(gonderi);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var gonderi = await _context.Gonderiler.FindAsync(id);
        if (gonderi != null)
        {
            _context.Gonderiler.Remove(gonderi);
            await _context.SaveChangesAsync();
        }
    }
}