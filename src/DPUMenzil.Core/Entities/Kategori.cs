namespace DPUMenzil.Core.Entities;

public class Kategori
{
    public int Id { get; set; } // Kategori sayısı az olacağı için int (PK) yeterli
    public string Ad { get; set; } = null!; // Örn: "Akademik", "Sosyal Etkinlik"
}