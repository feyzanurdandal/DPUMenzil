using DPUMenzil.Application.DTOs.UserDTOs;
using DPUMenzil.Application.Interfaces;
using DPUMenzil.Core.Entities;
using DPUMenzil.Core.Interfaces;

namespace DPUMenzil.Application.Services;

public class AuthService : IAuthService
{
    private readonly IKullaniciRepository _kullaniciRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtService _jwtService; // Yeni eklendi

    public AuthService(
        IKullaniciRepository kullaniciRepository, 
        IPasswordHasher passwordHasher, 
        IJwtService jwtService) // Constructor güncellendi
    {
        _kullaniciRepository = kullaniciRepository;
        _passwordHasher = passwordHasher;
        _jwtService = jwtService;
    }

    public async Task<string> RegisterAsync(UserRegisterDTO registerDto)
    {
        var mevcutKullanici = await _kullaniciRepository.GetByEmailAsync(registerDto.Email);
        if (mevcutKullanici != null)
        {
            throw new Exception("Bu e-posta adresi zaten kullanımda.");
        }

        string hashedSifre = _passwordHasher.HashPassword(registerDto.Sifre);

        var yeniKullanici = new Kullanici
        {
            Id = Guid.NewGuid(),
            Ad = registerDto.Ad,
            Soyad = registerDto.Soyad,
            Email = registerDto.Email,
            SifreHash = hashedSifre,
            OgrenciNo = registerDto.OgrenciNo,
            KayitTarihi = DateTime.UtcNow
        };

        await _kullaniciRepository.AddAsync(yeniKullanici);

        return "Kayıt başarıyla tamamlandı. Artık giriş yapabilirsiniz.";
    }

    public async Task<string> LoginAsync(UserLoginDTO loginDto)
    {
        // 1. Kullanıcıyı bul
        var kullanici = await _kullaniciRepository.GetByEmailAsync(loginDto.Email);
        
        // 2. Kullanıcı var mı ve şifre doğru mu kontrol et (Siber güvenlik için mesajları birleştirdik)
        if (kullanici == null || !_passwordHasher.VerifyPassword(loginDto.Sifre, kullanici.SifreHash))
        {
            throw new Exception("E-posta veya şifre hatalı.");
        }

        // 3. Başarılı giriş sonrası Token üret ve dön
        return _jwtService.GenerateToken(kullanici);
    }
}