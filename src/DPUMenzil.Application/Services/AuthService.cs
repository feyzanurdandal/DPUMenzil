using DPUMenzil.Application.DTOs.UserDTOs;
using DPUMenzil.Application.Interfaces;
using DPUMenzil.Core.Entities;
using DPUMenzil.Core.Interfaces;

namespace DPUMenzil.Application.Services;

public class AuthService : IAuthService
{
    private readonly IKullaniciRepository _kullaniciRepository;
    private readonly IPasswordHasher _passwordHasher;

    public AuthService(IKullaniciRepository kullaniciRepository, IPasswordHasher passwordHasher)
    {
        _kullaniciRepository = kullaniciRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task<string> RegisterAsync(UserRegisterDTO registerDto)
    {
        // 1. E-posta kontrolü (Aynı e-posta ile başkası var mı?)
        var mevcutKullanici = await _kullaniciRepository.GetByEmailAsync(registerDto.Email);
        if (mevcutKullanici != null)
        {
            throw new Exception("Bu e-posta adresi zaten kullanımda.");
        }

        // 2. Şifreyi siber güvenlik standartlarında hashle
        string hashedSifre = _passwordHasher.HashPassword(registerDto.Sifre);

        // 3. Entity oluştur (DTO'dan Entity'ye map)
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

        // 4. Veritabanına kaydet
        await _kullaniciRepository.AddAsync(yeniKullanici);

        return "Kayıt başarıyla tamamlandı. Artık giriş yapabilirsiniz.";
    }

    public async Task<string> LoginAsync(UserLoginDTO loginDto)
    {
        // 1. Kullanıcıyı bul
        var kullanici = await _kullaniciRepository.GetByEmailAsync(loginDto.Email);
        if (kullanici == null)
        {
            throw new Exception("E-posta veya şifre hatalı.");
        }

        // 2. Şifreyi siber güvenlik motorumuzla doğrula
        bool sifreDogruMu = _passwordHasher.VerifyPassword(loginDto.Sifre, kullanici.SifreHash);
        if (!sifreDogruMu)
        {
            throw new Exception("E-posta veya şifre hatalı.");
        }

        // 3. Şimdilik düz metin dönüyoruz, bir sonraki adımda buraya JWT ekleyeceğiz
        return "Giriş başarılı! (JWT Token yakında eklenecek)";
    }
}