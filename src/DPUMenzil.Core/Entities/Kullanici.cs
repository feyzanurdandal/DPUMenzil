using System.Collections.Generic;
using DPUMenzil.Core.Enums;

namespace DPUMenzil.Core.Entities;

public class Kullanici
{
    public Guid Id { get; set; } = Guid.NewGuid();
    
    // AuthService'in beklediği yeni alanlar
    public string Ad { get; set; } = null!;
    public string Soyad { get; set; } = null!;
    public string Email { get; set; } = null!; // Eposta yerine Email yaptık
    
    public string SifreHash { get; set; } = null!; 
    public string? OgrenciNo { get; set; } // Öğrenciler için opsiyonel alan
    
    public KullaniciRolu Rol { get; set; } = KullaniciRolu.Ogrenci;
    public DateTime KayitTarihi { get; set; } = DateTime.UtcNow;

    // Mevcut ilişkini koruyoruz (1-N İlişkisi)
    public ICollection<Gonderi> Gonderiler { get; set; } = new List<Gonderi>();
}