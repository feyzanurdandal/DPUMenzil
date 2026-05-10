using DPUMenzil.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DPUMenzil.Infrastructure.Persistence.Configurations;

public class KullaniciConfiguration : IEntityTypeConfiguration<Kullanici>
{
    public void Configure(EntityTypeBuilder<Kullanici> builder)
    {
        builder.HasKey(x => x.Id);

        // AdSoyad yerine Ad ve Soyad yapılandırması
        builder.Property(x => x.Ad).IsRequired().HasMaxLength(50);
        builder.Property(x => x.Soyad).IsRequired().HasMaxLength(50);

        // Eposta yerine Email yapılandırması
        builder.Property(x => x.Email).IsRequired().HasMaxLength(100);
        builder.HasIndex(x => x.Email).IsUnique(); // Siber güvenlik için: Aynı maille iki kayıt olamaz

        builder.Property(x => x.SifreHash).IsRequired();
    }
}