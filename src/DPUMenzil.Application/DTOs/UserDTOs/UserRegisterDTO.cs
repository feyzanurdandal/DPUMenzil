namespace DPUMenzil.Application.DTOs.UserDTOs;

public class UserRegisterDTO
{
    public string Ad { get; set; } = null!;
    public string Soyad { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Sifre { get; set; } = null!;
    public string? OgrenciNo { get; set; } // Sadece öğrenciler için
}