// // src/pages/DashboardPage.jsx
// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import GonderiCard from '../components/GonderiCard';
// import GonderiOlustur from '../components/GonderiOlustur';
// import { MOCK_KATEGORILER, MOCK_GONDERILER } from '../services/api';
// import api from '../services/api';
// import {
//   LayoutGrid, Bell, Lightbulb, AlertTriangle, Search,
//   Filter, TrendingUp, RefreshCw, ChevronDown, Utensils,
//   Bus, BookOpen, GraduationCap, Building, Dumbbell, MessageCircle
// } from 'lucide-react';

// const KAT_ICONS = { 'Yemekhane': Utensils, 'Ring Seferleri': Bus, 'Kütüphane': BookOpen, 'Akademik': GraduationCap, 'Sosyal Alan': Building, 'Spor': Dumbbell, 'Genel': MessageCircle };

// export default function DashboardPage() {
//   const { user } = useAuth();
//   const [kategoriler, setKategoriler] = useState(MOCK_KATEGORILER);
//   const [gonderiler, setGonderiler] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeKategori, setActiveKategori] = useState(null);
//   const [activeTur, setActiveTur] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [katRes, gonRes] = await Promise.all([
//         api.get('/Kategori'),
//         api.get('/Gonderi'),
//       ]);
//       setKategoriler(katRes.data);
//       setGonderiler(gonRes.data.filter(g => g.durum === 'approved' || g.durum === 'APPROVED'));
//     } catch {
//       // Use mock data
//       setKategoriler(MOCK_KATEGORILER);
//       setGonderiler(MOCK_GONDERILER.filter(g => g.durum === 'approved'));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filtered = gonderiler.filter(g => {
//     if (activeKategori && g.kategoriAd !== activeKategori) return false;
//     if (activeTur && g.tur !== activeTur) return false;
//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       return g.baslik.toLowerCase().includes(q) || g.icerik.toLowerCase().includes(q);
//     }
//     return true;
//   });

//   const stats = {
//     toplam: gonderiler.length,
//     duyuru: gonderiler.filter(g => g.tur === 'duyuru').length,
//     oneri: gonderiler.filter(g => g.tur === 'oneri').length,
//     sikayet: gonderiler.filter(g => g.tur === 'sikayet').length,
//   };

//   return (
//     <div style={{ minHeight: '100vh', background: 'var(--navy)' }} className="grid-bg">
//       <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px', display: 'grid', gridTemplateColumns: '240px 1fr 240px', gap: 20 }}>

//         {/* LEFT SIDEBAR */}
//         <aside style={{ position: 'sticky', top: 80, height: 'fit-content' }}>
//           {/* Stats */}
//           <div className="menzil-card" style={{ padding: 16, marginBottom: 14 }}>
//             <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: 12 }}>// GENEL BAKIŞ</div>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
//               {[
//                 { label: 'Toplam', val: stats.toplam, color: 'var(--text-primary)' },
//                 { label: 'Duyuru', val: stats.duyuru, color: '#60a5fa' },
//                 { label: 'Öneri', val: stats.oneri, color: '#4ade80' },
//                 { label: 'Şikayet', val: stats.sikayet, color: '#f87171' },
//               ].map(s => (
//                 <div key={s.label} style={{ background: 'var(--navy-mid)', borderRadius: 8, padding: '10px 10px 8px', textAlign: 'center', border: '1px solid var(--navy-border)' }}>
//                   <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.3rem', color: s.color }}>{s.val}</div>
//                   <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', letterSpacing: '0.04em' }}>{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Tur filter */}
//           <div className="menzil-card" style={{ padding: 16, marginBottom: 14 }}>
//             <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: 10 }}>// İÇERİK TÜRÜ</div>
//             {[
//               { id: null, label: 'Tümü', icon: LayoutGrid },
//               { id: 'duyuru', label: 'Duyurular', icon: Bell },
//               { id: 'oneri', label: 'Öneriler', icon: Lightbulb },
//               { id: 'sikayet', label: 'Şikayetler', icon: AlertTriangle },
//             ].map(({ id, label, icon: Icon }) => (
//               <button
//                 key={label}
//                 onClick={() => setActiveTur(id)}
//                 className={`sidebar-item ${activeTur === id ? 'active' : ''}`}
//                 style={{ width: '100%', textAlign: 'left', marginBottom: 3 }}
//               >
//                 <Icon size={15} />
//                 {label}
//               </button>
//             ))}
//           </div>

//           {/* Kategori filter */}
//           <div className="menzil-card" style={{ padding: 16 }}>
//             <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: 10 }}>// KATEGORİLER</div>
//             <button
//               onClick={() => setActiveKategori(null)}
//               className={`sidebar-item ${activeKategori === null ? 'active' : ''}`}
//               style={{ width: '100%', textAlign: 'left', marginBottom: 3 }}
//             >
//               <LayoutGrid size={15} />
//               Tüm Kategoriler
//             </button>
//             {kategoriler.map(k => {
//               const Icon = KAT_ICONS[k.ad] || MessageCircle;
//               return (
//                 <button
//                   key={k.id}
//                   onClick={() => setActiveKategori(k.ad)}
//                   className={`sidebar-item ${activeKategori === k.ad ? 'active' : ''}`}
//                   style={{ width: '100%', textAlign: 'left', marginBottom: 3 }}
//                 >
//                   <Icon size={15} />
//                   {k.ad}
//                 </button>
//               );
//             })}
//           </div>
//         </aside>

//         {/* MAIN FEED */}
//         <main>
//           {/* Create post box */}
//           <GonderiOlustur onGonderiOlusturuldu={fetchData} kategoriler={kategoriler} />

//           {/* Search & filter bar */}
//           <div style={{ display: 'flex', gap: 10, margin: '14px 0', alignItems: 'center' }}>
//             <div style={{ flex: 1, position: 'relative' }}>
//               <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
//               <input
//                 className="menzil-input"
//                 placeholder="Gönderi ara..."
//                 value={searchQuery}
//                 onChange={e => setSearchQuery(e.target.value)}
//                 style={{ paddingLeft: 36 }}
//               />
//             </div>
//             <button
//               onClick={fetchData}
//               style={{ background: 'var(--navy-card)', border: '1px solid var(--navy-border)', borderRadius: 8, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', flexShrink: 0, transition: 'all 0.2s' }}
//               onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
//               onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
//               title="Yenile"
//             >
//               <RefreshCw size={15} />
//             </button>
//           </div>

//           {/* Result info */}
//           {(activeKategori || activeTur || searchQuery) && (
//             <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
//               <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'Share Tech Mono, monospace' }}>
//                 {filtered.length} sonuç
//               </span>
//               {activeKategori && <span className="tag" style={{ background: 'rgba(212,160,23,0.1)', color: 'var(--gold)', border: '1px solid rgba(212,160,23,0.25)' }}>{activeKategori} ✕</span>}
//               {activeTur && <span className="tag" style={{ background: 'rgba(212,160,23,0.1)', color: 'var(--gold)', border: '1px solid rgba(212,160,23,0.25)' }}>{activeTur} ✕</span>}
//             </div>
//           )}

//           {/* Feed */}
//           {loading ? (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//               {[1, 2, 3].map(i => (
//                 <div key={i} className="menzil-card" style={{ padding: 22, height: 160, animation: 'pulse 1.5s ease-in-out infinite' }}>
//                   <div style={{ background: 'var(--navy-mid)', height: 16, borderRadius: 4, width: '60%', marginBottom: 12 }} />
//                   <div style={{ background: 'var(--navy-mid)', height: 12, borderRadius: 4, width: '90%', marginBottom: 8 }} />
//                   <div style={{ background: 'var(--navy-mid)', height: 12, borderRadius: 4, width: '75%' }} />
//                 </div>
//               ))}
//             </div>
//           ) : filtered.length === 0 ? (
//             <div className="menzil-card" style={{ padding: 48, textAlign: 'center' }}>
//               <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔍</div>
//               <p style={{ color: 'var(--text-muted)', fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1rem' }}>Gönderi bulunamadı</p>
//             </div>
//           ) : (
//             <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//               {filtered.map(g => <GonderiCard key={g.id} gonderi={g} />)}
//             </div>
//           )}
//         </main>

//         {/* RIGHT SIDEBAR */}
//         <aside style={{ position: 'sticky', top: 80, height: 'fit-content' }}>
//           <div className="menzil-card" style={{ padding: 16, marginBottom: 14 }}>
//             <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: 12 }}>// TREND KATEGORİLER</div>
//             {kategoriler.slice(0, 5).map((k, i) => (
//               <div key={k.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 4 ? '1px solid rgba(30,45,74,0.6)' : 'none' }}>
//                 <span style={{ color: 'var(--text-muted)', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', width: 16 }}>#{i + 1}</span>
//                 <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', flex: 1 }}>{k.ad}</span>
//                 <TrendingUp size={12} style={{ color: 'var(--gold)', opacity: 0.6 }} />
//               </div>
//             ))}
//           </div>

//           <div className="menzil-card" style={{ padding: 16 }}>
//             <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: 10 }}>// HAKKINDA</div>
//             <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.6 }}>
//               DPÜ Menzil, Kütahya Dumlupınar Üniversitesi öğrencilerinin kampüs deneyimlerini paylaştığı sosyal platformdur.
//             </p>
//             <div className="divider-gold" />
//             <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
//               v1.0.0 // KDÜ © 2025
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }


// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import GonderiCard from '../components/GonderiCard';
import GonderiOlustur from '../components/GonderiOlustur';
import api from '../services/api'; // Mock'ları buradan değil, sadece api'yi alıyoruz
import {
  LayoutGrid, Bell, Lightbulb, AlertTriangle, Search,
  Filter, TrendingUp, RefreshCw, ChevronDown, Utensils,
  Bus, BookOpen, GraduationCap, Building, Dumbbell, MessageCircle
} from 'lucide-react';

// Backend'den gelen kategori isimlerine göre ikon eşleştirmesi
const KAT_ICONS = { 
  'Yemekhane': Utensils, 
  'Ring Seferleri': Bus, 
  'Kütüphane': BookOpen, 
  'Akademik': GraduationCap, 
  'Sosyal Alan': Building, 
  'Spor': Dumbbell, 
  'Genel': MessageCircle 
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [kategoriler, setKategoriler] = useState([]); // Başlangıçta boş array
  const [gonderiler, setGonderiler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeKategori, setActiveKategori] = useState(null);
  const [activeTur, setActiveTur] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 🚀 ASIL BAĞLANTI NOKTASI: Backend'den verileri çekiyoruz
      const [katRes, gonRes] = await Promise.all([
        api.get('/Kategori'),
        api.get('/Gonderi'),
      ]);

      setKategoriler(katRes.data);
      
      // Sadece onaylanmış gönderileri gösteriyoruz (Büyük/Küçük harf duyarlılığına dikkat)
      const approvedPosts = gonRes.data.filter(g => 
        g.durum?.toLowerCase() === 'approved' || g.durum === 'Onaylandi'
      );
      setGonderiler(approvedPosts);

    } catch (err) {
      console.error("Veri çekme hatası:", err);
      // Hata durumunda boş bırakıyoruz ki kullanıcıya "Gönderi bulunamadı" desin
      setKategoriler([]);
      setGonderiler([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtreleme mantığı (Backend'den gelen verilere göre)
  const filtered = gonderiler.filter(g => {
    // Kategoriye göre filtrele (kategoriId veya kategoriAd üzerinden gidebilirsin)
    if (activeKategori && g.kategoriAd !== activeKategori) return false;
    
    // Türe göre filtrele (duyuru, oneri, sikayet)
    if (activeTur && g.tur?.toLowerCase() !== activeTur.toLowerCase()) return false;
    
    // Arama sorgusuna göre filtrele
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return g.baslik?.toLowerCase().includes(q) || g.icerik?.toLowerCase().includes(q);
    }
    return true;
  });

  // İstatistikleri hesapla
  const stats = {
    toplam: filtered.length,
    duyuru: filtered.filter(g => g.tur?.toLowerCase() === 'duyuru').length,
    oneri: filtered.filter(g => g.tur?.toLowerCase() === 'oneri').length,
    sikayet: filtered.filter(g => g.tur?.toLowerCase() === 'sikayet').length,
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)' }} className="grid-bg">
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px', display: 'grid', gridTemplateColumns: '240px 1fr 240px', gap: 20 }}>
        
        {/* SOL MENÜ: İstatistikler ve Filtreler */}
        <aside style={{ position: 'sticky', top: 80, height: 'fit-content' }}>
          <div className="menzil-card" style={{ padding: 16, marginBottom: 14 }}>
            <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: 12 }}>// İSTATİSTİKLER</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'Sonuç', val: stats.toplam, color: 'var(--text-primary)' },
                { label: 'Duyuru', val: stats.duyuru, color: '#60a5fa' },
                { label: 'Öneri', val: stats.oneri, color: '#4ade80' },
                { label: 'Şikayet', val: stats.sikayet, color: '#f87171' },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--navy-mid)', borderRadius: 8, padding: '10px 10px 8px', textAlign: 'center', border: '1px solid var(--navy-border)' }}>
                  <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.3rem', color: s.color }}>{s.val}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', letterSpacing: '0.04em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="menzil-card" style={{ padding: 16 }}>
             <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: 10 }}>// KATEGORİLER</div>
             {/* Kategori listesi tıklandığında activeKategori state'ini günceller */}
             {kategoriler.map(k => {
               const Icon = KAT_ICONS[k.ad] || MessageCircle;
               return (
                 <button
                   key={k.id}
                   onClick={() => setActiveKategori(activeKategori === k.ad ? null : k.ad)}
                   className={`sidebar-item ${activeKategori === k.ad ? 'active' : ''}`}
                   style={{ width: '100%', textAlign: 'left', marginBottom: 3 }}
                 >
                   <Icon size={15} />
                   {k.ad}
                 </button>
               );
             })}
          </div>
        </aside>

        {/* ORTA ALAN: Gönderi Akışı */}
        <main>
          <GonderiOlustur onGonderiOlusturuldu={fetchData} kategoriler={kategoriler} />
          
          <div style={{ display: 'flex', gap: 10, margin: '14px 0' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                className="menzil-input"
                placeholder="Gönderilerde ara..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingLeft: 36 }}
              />
            </div>
            <button onClick={fetchData} className="btn-refresh"><RefreshCw size={15} /></button>
          </div>

          {/* Gönderi Listesi */}
          {loading ? (
             <div className="loading-skeleton">Veriler yükleniyor...</div>
          ) : filtered.length === 0 ? (
             <div className="empty-state">Henüz gönderi yok.</div>
          ) : (
            <div className="stagger">
              {filtered.map(g => <GonderiCard key={g.id} gonderi={g} />)}
            </div>
          )}
        </main>

        {/* SAĞ MENÜ: Trendler ve Bilgi */}
        <aside style={{ position: 'sticky', top: 80, height: 'fit-content' }}>
          <div className="menzil-card" style={{ padding: 16 }}>
            <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: 12 }}>// PLATFORM BİLGİSİ</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.6 }}>
              DPÜ Menzil v1.0. Hoş geldin {user?.ad}!
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
}