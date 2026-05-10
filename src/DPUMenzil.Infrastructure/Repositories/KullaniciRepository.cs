using DPUMenzil.Core.Entities;
using DPUMenzil.Core.Interfaces;
using DPUMenzil.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace DPUMenzil.Infrastructure.Persistence.Repositories;


public class KullaniciRepository : IKullaniciRepository
{
    private readonly AppDbContext _context;

    public KullaniciRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Kullanici?> GetByIdAsync(Guid id)
    {
        return await _context.Kullanicilar.FindAsync(id);
    }

    public async Task<Kullanici?> GetByEmailAsync(string email)
    {
        // Siber güvenlik için: Email eşleşmesini büyük/küçük harf duyarsız yapabiliriz
        return await _context.Kullanicilar
            .FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
    }

    public async Task AddAsync(Kullanici kullanici)
    {
        await _context.Kullanicilar.AddAsync(kullanici);
        await _context.SaveChangesAsync();
    }
}