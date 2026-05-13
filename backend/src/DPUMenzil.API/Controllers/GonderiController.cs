using System.Security.Claims;
using DPUMenzil.Core.DTOs.GonderiDTOs;
using DPUMenzil.Core.Entities;
using DPUMenzil.Core.Interfaces;
using DPUMenzil.Core.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DPUMenzil.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class GonderiController : ControllerBase
{
    private readonly IGonderiRepository _gonderiRepository;

    public GonderiController(IGonderiRepository gonderiRepository)
    {
        _gonderiRepository = gonderiRepository;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] GonderiCreateDTO dto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null) return Unauthorized("Kullanıcı kimliği doğrulanamadı.");

        var gonderi = new Gonderi
        {
            Baslik = dto.Baslik,
            Icerik = dto.Icerik,
            KategoriId = dto.KategoriId,
            AnonimMi = dto.AnonimMi,
            OlusturanKullaniciId = Guid.Parse(userIdClaim.Value),
            
            // DTO'da Tur yoksa varsayılan Oneri, varsa DTO'dan gelen (Eğer eklersen)
            Tur = GonderiTuru.Oneri, 
            Durum = GonderiDurumu.Beklemede,
            OlusturulmaTarihi = DateTime.UtcNow
        };

        await _gonderiRepository.AddAsync(gonderi);

        return Ok(new { 
            mesaj = "Harika! Gönderin başarıyla oluşturuldu.", 
            gonderiId = gonderi.Id 
        });
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var gonderiler = await _gonderiRepository.GetAllAsync();

        // 🚀 DÜZELTME: Ad ve Soyad'ı burada birleştiriyoruz
        var sonuc = gonderiler.Select(g => new
        {
            g.Id,
            g.Baslik,
            g.Icerik,
            g.Tur,
            g.Durum,
            // Ad ve Soyad birleştirme operasyonu
            Olusturan = g.AnonimMi 
                ? "Anonim Öğrenci" 
                : $"{g.OlusturanKullanici.Ad} {g.OlusturanKullanici.Soyad}",
            KategoriAd = g.Kategori.Ad,
            Tarih = g.OlusturulmaTarihi
        });

        return Ok(sonuc);
    }
}