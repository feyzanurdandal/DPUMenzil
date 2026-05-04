using DPUMenzil.Core.Enums;

namespace DPUMenzil.Core.Entities;

public class Gonderi
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Baslik { get; set; } = null!;
    public string Icerik { get; set; } = null!;
    public GonderiTuru Tur { get; set; } // Duyuru, Oneri, Sikayet[cite: 3]
    public GonderiDurumu Durum { get; set; } = GonderiDurumu.Beklemede; 
    
    // Siber Güvenlik ve Gizlilik: Anonimlik desteği
    public bool AnonimMi { get; set; } = false; 
    
    // İlişkiler (Foreign Keys)
    public Guid OlusturanKullaniciId { get; set; }
    public Kullanici OlusturanKullanici { get; set; } = null!;
    
    public int KategoriId { get; set; }
    public Kategori Kategori { get; set; } = null!;

    public DateTime OlusturulmaTarihi { get; set; } = DateTime.UtcNow;
}