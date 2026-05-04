namespace DPUMenzil.Core.DTOs.GonderiDTOs;

public class GonderiCreateDTO
{
    public string Baslik { get; set; } = null!;
    public string Icerik { get; set; } = null!;
    public Guid KategoriId { get; set; }
    public bool AnonimMi { get; set; } = false;
}