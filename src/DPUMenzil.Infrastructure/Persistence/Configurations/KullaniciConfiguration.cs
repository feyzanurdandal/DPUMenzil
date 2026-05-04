using DPUMenzil.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DPUMenzil.Infrastructure.Persistence.Configurations;

public class KullaniciConfiguration : IEntityTypeConfiguration<Kullanici>
{
    public void Configure(EntityTypeBuilder<Kullanici> builder)
    {
        builder.HasKey(k => k.Id);
        
        builder.Property(k => k.AdSoyad).IsRequired().HasMaxLength(100);
        
        // SİBER GÜVENLİK: E-posta benzersiz olmalı ve indexlenmeli
        builder.HasIndex(k => k.Eposta).IsUnique();
        builder.Property(k => k.Eposta).IsRequired().HasMaxLength(150);
        
        builder.Property(k => k.SifreHash).IsRequired();
    }
}