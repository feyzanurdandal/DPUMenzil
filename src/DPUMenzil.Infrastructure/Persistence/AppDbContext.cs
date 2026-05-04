using DPUMenzil.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace DPUMenzil.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Kullanici> Kullanicilar => Set<Kullanici>();
    public DbSet<Gonderi> Gonderiler => Set<Gonderi>();
    public DbSet<Kategori> Kategoriler => Set<Kategori>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Fluent API konfigürasyonlarını otomatik olarak uygular
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        
        base.OnModelCreating(modelBuilder);
    }
}