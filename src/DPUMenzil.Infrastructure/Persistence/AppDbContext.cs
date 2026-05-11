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
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        // 🚀 1. Gonderi - OlusturanKullanici İlişkisi
        modelBuilder.Entity<Gonderi>()
            .HasOne(g => g.OlusturanKullanici)
            .WithMany() 
            .HasForeignKey(g => g.OlusturanKullaniciId)
            .OnDelete(DeleteBehavior.Cascade);

        // 🚀 2. Gonderi - Kategori İlişkisi
        modelBuilder.Entity<Gonderi>()
            .HasOne(g => g.Kategori)
            .WithMany()
            .HasForeignKey(g => g.KategoriId)
            .OnDelete(DeleteBehavior.Restrict);

        // 🚀 3. Enum -> String Dönüşümleri (Siber Güvenlik ve Okunabilirlik İçin)
        modelBuilder.Entity<Gonderi>()
            .Property(g => g.Tur)
            .HasConversion<string>();

        modelBuilder.Entity<Gonderi>()
            .Property(g => g.Durum)
            .HasConversion<string>();

        // 🌱 Seed Data (Kategoriler)
        modelBuilder.Entity<Kategori>().HasData(
            new Kategori { Id = Guid.Parse("a1b2c3d4-e5f6-4a1b-8c2d-1e2f3a4b5c6d"), Ad = "Yemekhane", Aciklama = "Yemek listesi ve kalite geri bildirimleri" },
            new Kategori { Id = Guid.Parse("b2c3d4e5-f6a1-4b2c-9d3e-2f3a4b5c6d7e"), Ad = "Ring Seferleri", Aciklama = "Kampüs içi ulaşım ve saatler" },
            new Kategori { Id = Guid.Parse("c3d4e5f6-a1b2-4c3d-0e4f-3a4b5c6d7e8f"), Ad = "Kütüphane", Aciklama = "Çalışma alanları ve kaynaklar" },
            new Kategori { Id = Guid.Parse("d4e5f6a1-b2c3-4d4e-1f5a-4b5c6d7e8f9a"), Ad = "Güvenlik", Aciklama = "Kampüs güvenliği ve acil durumlar" },
            new Kategori { Id = Guid.Parse("e5f6a1b2-c3d4-4e5f-2a6b-5c6d7e8f9a0b"), Ad = "Akademik", Aciklama = "Dersler ve sınav süreçleri hakkında" }
        );
    }
}