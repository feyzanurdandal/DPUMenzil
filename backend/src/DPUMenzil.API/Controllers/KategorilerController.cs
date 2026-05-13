using DPUMenzil.Application.DTOs.KategoriDTOs;
using DPUMenzil.Core.Interfaces;
using Microsoft.AspNetCore.Authorization; // Güvenlik için eklendi
using Microsoft.AspNetCore.Mvc;

namespace DPUMenzil.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class KategorilerController : ControllerBase
{
    private readonly IKategoriRepository _kategoriRepository;

    public KategorilerController(IKategoriRepository kategoriRepository)
    {
        _kategoriRepository = kategoriRepository;
    }

    /// <summary>
    /// Tüm kategorileri listeler.
    /// [Authorize] sayesinde sadece giriş yapmış (geçerli token sahibi) kullanıcılar erişebilir.
    /// </summary>
    [HttpGet]
    [Authorize] 
    public async Task<ActionResult<IEnumerable<KategoriResponseDTO>>> GetKategoriler()
    {
        var kategoriler = await _kategoriRepository.GetAllAsync();

        var response = kategoriler.Select(k => new KategoriResponseDTO
        {
            Id = k.Id,
            Ad = k.Ad,
            Aciklama = k.Aciklama
        });

        return Ok(response);
    }

    /* GÜVENLİK NOTU: 
       Kategori ekleme, silme veya güncelleme gibi işlemleri 
       sadece 'Admin' rolüne sahip olanların yapabilmesi için:
       [Authorize(Roles = "Admin")] 
       özniteliğini kullanacağız.
    */
}