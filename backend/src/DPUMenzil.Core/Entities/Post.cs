namespace DPUMenzil.Core.Entities;

public class Post
{
    public Guid Id { get; set; }
    public string Baslik { get; set; } = string.Empty;
    public string Icerik { get; set; } = string.Empty;
    public string? ResimUrl { get; set; } // Opsiyonel, her gönderide resim olmayabilir
    public DateTime OlusturulmaTarihi { get; set; } = DateTime.UtcNow;

    // İlişkiler (Foreign Keys)
    public Guid KullaniciId { get; set; }
    public Kullanici Kullanici { get; set; } = null!;

    public Guid KategoriId { get; set; }
    public Kategori Kategori { get; set; } = null!;
}