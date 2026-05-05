// 'Core' olan yeri 'Application' olarak güncelliyoruz
namespace DPUMenzil.Application.DTOs.KategoriDTOs; 

public class KategoriResponseDTO
{
    public Guid Id { get; set; }
    public string Ad { get; set; } = null!;
    public string? Aciklama { get; set; }
}