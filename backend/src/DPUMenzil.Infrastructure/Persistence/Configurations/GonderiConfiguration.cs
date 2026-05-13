using DPUMenzil.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DPUMenzil.Infrastructure.Persistence.Configurations;

public class GonderiConfiguration : IEntityTypeConfiguration<Gonderi>
{
    public void Configure(EntityTypeBuilder<Gonderi> builder)
    {
        builder.HasKey(g => g.Id);
        
        builder.Property(g => g.Baslik).IsRequired().HasMaxLength(200);
        builder.Property(g => g.Icerik).IsRequired();

        // İlişkiler: Bir gönderinin mutlaka bir yazarı olmalı[cite: 1]
        builder.HasOne(g => g.OlusturanKullanici)
               .WithMany(k => k.Gonderiler)
               .HasForeignKey(g => g.OlusturanKullaniciId)
               .OnDelete(DeleteBehavior.Restrict); // Kullanıcı silinince gönderiler kalmalı (Denetim için)
               
        // Moderasyon İlişkisi[cite: 2]
        builder.Property(g => g.Durum).IsRequired();
    }
}