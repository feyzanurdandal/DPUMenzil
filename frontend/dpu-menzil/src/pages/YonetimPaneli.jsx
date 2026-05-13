// src/pages/YonetimPaneli.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, Eye, Send, Filter } from 'lucide-react';
import api, { MOCK_GONDERILER } from '../services/api';

const STATUS_LABEL = { approved: 'Onaylandı', pending: 'Beklemede', rejected: 'Reddedildi' };
const TUR_CONFIG = {
  duyuru: { label: 'Duyuru', cls: 'tag-duyuru', icon: '📢' },
  oneri: { label: 'Öneri', cls: 'tag-oneri', icon: '💡' },
  sikayet: { label: 'Şikayet', cls: 'tag-sikayet', icon: '🚨' },
};

export default function YonetimPaneli() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [talepler, setTalepler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [actionLoading, setActionLoading] = useState({});
  const [newDuyuru, setNewDuyuru] = useState({ baslik: '', icerik: '', kategoriId: 1 });
  const [duyuruSuccess, setDuyuruSuccess] = useState(false);

  useEffect(() => {
    if (user?.rol !== 'idariPersonel' && user?.rol !== 'admin') {
      navigate('/');
      return;
    }
    fetchTalepler();
  }, []);

  const fetchTalepler = async () => {
    setLoading(true);
    try {
      const res = await api.get('/Gonderi/requests/pending');
      setTalepler(res.data);
    } catch {
      setTalepler(MOCK_GONDERILER.map(g => ({ ...g, durum: g.durum === 'approved' ? 'approved' : 'pending' })));
    } finally {
      setLoading(false);
    }
  };

  const handleKarar = async (id, karar) => {
    setActionLoading(p => ({ ...p, [id]: true }));
    try {
      await api.put(`/Gonderi/${id}/status`, { status: karar });
    } catch {}
    setTalepler(p => p.map(t => t.id === id ? { ...t, durum: karar } : t));
    setActionLoading(p => ({ ...p, [id]: false }));
  };

  const handleDuyuruGonder = async () => {
    try {
      await api.post('/announcements', { ...newDuyuru, durum: 'APPROVED' });
    } catch {}
    setDuyuruSuccess(true);
    setNewDuyuru({ baslik: '', icerik: '', kategoriId: 1 });
    setTimeout(() => setDuyuruSuccess(false), 2500);
  };

  const filtered = talepler.filter(t => filter === 'tumu' || t.durum === filter);

  const counts = {
    pending: talepler.filter(t => t.durum === 'pending').length,
    approved: talepler.filter(t => t.durum === 'approved').length,
    rejected: talepler.filter(t => t.durum === 'rejected').length,
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)' }} className="grid-bg">
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 16px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div className="font-mono-tech" style={{ color: 'var(--crimson-bright)', fontSize: '0.7rem', letterSpacing: '0.15em', marginBottom: 4 }}>
            // YÖNETİM PANELİ
          </div>
          <h1 className="font-rajdhani" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Bekleyen Talepler
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Öğrenci gönderilerini inceleyin, onaylayın veya reddedin.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
          {/* Main content */}
          <div>
            {/* Stats row */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              {[
                { key: 'pending', label: 'Beklemede', count: counts.pending, color: 'var(--gold)', icon: Clock },
                { key: 'approved', label: 'Onaylanan', count: counts.approved, color: '#4ade80', icon: CheckCircle },
                { key: 'rejected', label: 'Reddedilen', count: counts.rejected, color: '#f87171', icon: XCircle },
              ].map(({ key, label, count, color, icon: Icon }) => (
                <div
                  key={key}
                  className="menzil-card"
                  onClick={() => setFilter(key)}
                  style={{
                    flex: 1, padding: '14px 16px', cursor: 'pointer',
                    borderColor: filter === key ? color : 'var(--navy-border)',
                    background: filter === key ? `${color}10` : 'var(--navy-card)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Icon size={16} style={{ color }} />
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{label}</span>
                  </div>
                  <div className="font-rajdhani" style={{ fontSize: '1.8rem', fontWeight: 700, color }}>{count}</div>
                </div>
              ))}
              <div
                className="menzil-card"
                onClick={() => setFilter('tumu')}
                style={{
                  padding: '14px 16px', cursor: 'pointer',
                  borderColor: filter === 'tumu' ? 'var(--text-secondary)' : 'var(--navy-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <Filter size={16} style={{ color: 'var(--text-secondary)' }} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Tümü</span>
                </div>
                <div className="font-rajdhani" style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{talepler.length}</div>
              </div>
            </div>

            {/* List */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Yükleniyor...</div>
            ) : filtered.length === 0 ? (
              <div className="menzil-card" style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: 10 }}>✅</div>
                <p style={{ color: 'var(--text-muted)', fontFamily: 'Rajdhani, sans-serif' }}>Bu kategoride talep yok</p>
              </div>
            ) : (
              <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filtered.map(talep => {
                  const tur = TUR_CONFIG[talep.tur] || TUR_CONFIG.duyuru;
                  return (
                    <div key={talep.id} className="menzil-card" style={{ padding: '18px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <span className={`tag ${tur.cls}`}>{tur.icon} {tur.label}</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontFamily: 'Share Tech Mono, monospace' }}>
                              {talep.olusturan} · {talep.kategoriAd}
                            </span>
                          </div>
                          <h3 className="font-rajdhani" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 5 }}>
                            {talep.baslik}
                          </h3>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                            {talep.icerik}
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                          {talep.durum === 'pending' ? (
                            <>
                              <button
                                onClick={() => handleKarar(talep.id, 'approved')}
                                disabled={actionLoading[talep.id]}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: 5,
                                  padding: '7px 14px', borderRadius: 8, cursor: 'pointer',
                                  background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)',
                                  color: '#4ade80', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
                                  fontSize: '0.82rem', transition: 'all 0.2s'
                                }}
                              >
                                <CheckCircle size={13} /> Onayla
                              </button>
                              <button
                                onClick={() => handleKarar(talep.id, 'rejected')}
                                disabled={actionLoading[talep.id]}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: 5,
                                  padding: '7px 14px', borderRadius: 8, cursor: 'pointer',
                                  background: 'rgba(192,32,42,0.12)', border: '1px solid rgba(192,32,42,0.3)',
                                  color: '#f87171', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
                                  fontSize: '0.82rem', transition: 'all 0.2s'
                                }}
                              >
                                <XCircle size={13} /> Reddet
                              </button>
                            </>
                          ) : (
                            <span className={`tag ${talep.durum === 'approved' ? 'status-approved' : 'status-rejected'}`} style={{ fontSize: '0.72rem', alignSelf: 'flex-start' }}>
                              {talep.durum === 'approved' ? '✓ Onaylandı' : '✕ Reddedildi'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Direct announcement */}
          <aside>
            <div className="menzil-card" style={{ padding: 20 }}>
              <div className="font-mono-tech" style={{ color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '0.12em', marginBottom: 14 }}>
                // DİREKT DUYURU OLUŞTUR
              </div>

              {duyuruSuccess ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>📢</div>
                  <p style={{ color: '#4ade80', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>
                    Duyuru yayınlandı!
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <input
                    className="menzil-input"
                    placeholder="Duyuru başlığı *"
                    value={newDuyuru.baslik}
                    onChange={e => setNewDuyuru(p => ({ ...p, baslik: e.target.value }))}
                  />
                  <textarea
                    className="menzil-input"
                    placeholder="Duyuru içeriği..."
                    value={newDuyuru.icerik}
                    onChange={e => setNewDuyuru(p => ({ ...p, icerik: e.target.value }))}
                    style={{ minHeight: 100 }}
                  />
                  <button
                    onClick={handleDuyuruGonder}
                    disabled={!newDuyuru.baslik.trim() || !newDuyuru.icerik.trim()}
                    className="btn-gold"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    <Send size={14} />
                    Doğrudan Yayınla
                  </button>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textAlign: 'center', lineHeight: 1.5 }}>
                    Bu duyuru onay beklenmeksizin tüm kullanıcılara görünecek.
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
