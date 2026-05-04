using System.Collections.Generic; // ICollection için gerekli
using DPUMenzil.Core.Enums;

namespace DPUMenzil.Core.Entities;

public class Kullanici
{
    public Guid Id { get; set; } = Guid.NewGuid(); 
    public string AdSoyad { get; set; } = null!;
    public string Eposta { get; set; } = null!;
    public string SifreHash { get; set; } = null!; 
    public KullaniciRolu Rol { get; set; } = KullaniciRolu.Ogrenci;
    public DateTime KayitTarihi { get; set; } = DateTime.UtcNow;

    // --- KRİTİK EKSİK BURASI ---
    // Bir kullanıcının birden fazla gönderisi olabilir (1-N İlişkisi)
    public ICollection<Gonderi> Gonderiler { get; set; } = new List<Gonderi>();
}