namespace DPUMenzil.Core.DTOs.KategoriDTOs;

public class KategoriResponseDTO
{
    public Guid Id { get; set; }
    public string Ad { get; set; } = null!;
    public string? Aciklama { get; set; }
}