using DPUMenzil.Core.Enums;

namespace DPUMenzil.Core.Entities;

public class Kullanici
{
    // Siber Güvenlik: Tahmin edilemez UUID kullanımı
    public Guid Id { get; set; } = Guid.NewGuid(); 
    public string AdSoyad { get; set; } = null!;
    public string Eposta { get; set; } = null!; // @dpu.edu.tr kontrolü Application katmanında yapılacak
    public string SifreHash { get; set; } = null!; 
    public KullaniciRolu Rol { get; set; } // Admin, IdariPersonel, Ogrenci
    public DateTime KayitTarihi { get; set; } = DateTime.UtcNow;
}