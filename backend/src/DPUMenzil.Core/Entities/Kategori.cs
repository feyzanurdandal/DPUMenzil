using System;
using System.Collections.Generic;

namespace DPUMenzil.Core.Entities;

public class Kategori
{
    // Id tipini 'int' yerine 'Guid' yapıyoruz.
    public Guid Id { get; set; } = Guid.NewGuid(); 
    
    public string Ad { get; set; } = null!;
    
    // Eksik olan 'Aciklama' alanını ekliyoruz.
    public string? Aciklama { get; set; } 

    // İlişki: Bir kategoride birden fazla gönderi olabilir.
    public ICollection<Gonderi> Gonderiler { get; set; } = new List<Gonderi>();
}