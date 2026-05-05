using DPUMenzil.Application.DTOs.KategoriDTOs; // 'Core' yerine 'Application' yazdık
using DPUMenzil.Core.Interfaces;
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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<KategoriResponseDTO>>> GetKategoriler()
    {
        var kategoriler = await _kategoriRepository.GetAllAsync();

        // GÜVENLİK NOTU: Entity'yi (Kategori) asla doğrudan dönmüyoruz.
        // Onu sadece ihtiyacımız olan alanları içeren DTO'ya map ediyoruz.
        var response = kategoriler.Select(k => new KategoriResponseDTO
        {
            Id = k.Id,
            Ad = k.Ad,
            Aciklama = k.Aciklama
        });

        return Ok(response);
    }
}