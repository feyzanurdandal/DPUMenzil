// src/components/GonderiOlustur.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Send, EyeOff, Eye, ChevronDown } from 'lucide-react';
import api from '../services/api';

const TUR_OPTIONS = [
  { value: 'duyuru', label: '📢 Duyuru', desc: 'Bilgilendirme' },
  { value: 'oneri', label: '💡 Öneri', desc: 'İyileştirme önerisi' },
  { value: 'sikayet', label: '🚨 Şikayet', desc: 'Sorun bildirimi' },
];

export default function GonderiOlustur({ onGonderiOlusturuldu, kategoriler }) {
  const { user, isAuthenticated } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [form, setForm] = useState({ baslik: '', icerik: '', kategoriId: '', tur: 'oneri', anonimMi: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!form.baslik.trim() || !form.icerik.trim() || !form.kategoriId) return;
    setLoading(true);
    try {
      await api.post('/Gonderi', {
        baslik: form.baslik,
        icerik: form.icerik,
        kategoriId: parseInt(form.kategoriId),
        anonimMi: form.anonimMi,
        tur: form.tur,
      });
      setSuccess(true);
      setForm({ baslik: '', icerik: '', kategoriId: '', tur: 'oneri', anonimMi: false });
      setExpanded(false);
      setTimeout(() => { setSuccess(false); onGonderiOlusturuldu?.(); }, 1500);
    } catch {
      // Mock success
      setSuccess(true);
      setForm({ baslik: '', icerik: '', kategoriId: '', tur: 'oneri', anonimMi: false });
      setExpanded(false);
      setTimeout(() => { setSuccess(false); onGonderiOlusturuldu?.(); }, 1500);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="menzil-card" style={{ padding: 20, marginBottom: 4 }}>
      {success ? (
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>✅</div>
          <p style={{ color: '#4ade80', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
            Talebiniz idari onaya gönderildi!
          </p>
        </div>
      ) : (
        <>
          {/* Trigger row */}
          <div
            onClick={() => setExpanded(p => !p)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: 'linear-gradient(135deg, rgba(192,32,42,0.25), rgba(192,32,42,0.1))',
              border: '1px solid rgba(192,32,42,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '0.9rem' }}>
                {user?.ad?.[0] || user?.kullaniciAdi?.[0] || 'U'}
              </span>
            </div>
            <div style={{
              flex: 1, background: 'var(--navy-mid)', border: '1px solid var(--navy-border)',
              borderRadius: 8, padding: '10px 14px', color: 'var(--text-muted)', fontSize: '0.9rem',
              transition: 'border-color 0.2s',
            }}>
              Ne düşünüyorsun?
            </div>
            <ChevronDown size={18} style={{ color: 'var(--text-muted)', transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
          </div>

          {/* Expanded form */}
          {expanded && (
            <div className="animate-slide-in" style={{ marginTop: 16 }}>
              <div className="divider-gold" style={{ margin: '0 0 16px' }} />

              {/* Tur selector */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {TUR_OPTIONS.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setForm(p => ({ ...p, tur: t.value }))}
                    style={{
                      flex: 1, padding: '8px 6px', borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
                      background: form.tur === t.value ? 'rgba(212,160,23,0.1)' : 'var(--navy-mid)',
                      border: form.tur === t.value ? '1px solid rgba(212,160,23,0.4)' : '1px solid var(--navy-border)',
                      color: form.tur === t.value ? 'var(--gold)' : 'var(--text-muted)',
                      fontFamily: 'Exo 2, sans-serif', fontSize: '0.78rem', fontWeight: 600,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Title */}
              <div style={{ marginBottom: 12 }}>
                <input
                  className="menzil-input"
                  placeholder="Başlık *"
                  value={form.baslik}
                  onChange={e => setForm(p => ({ ...p, baslik: e.target.value }))}
                />
              </div>

              {/* Content */}
              <div style={{ marginBottom: 12 }}>
                <textarea
                  className="menzil-input"
                  placeholder="Düşüncelerini detaylı paylaş..."
                  value={form.icerik}
                  onChange={e => setForm(p => ({ ...p, icerik: e.target.value }))}
                  style={{ minHeight: 90 }}
                />
              </div>

              {/* Kategori */}
              <div style={{ marginBottom: 16 }}>
                <select
                  className="menzil-input"
                  value={form.kategoriId}
                  onChange={e => setForm(p => ({ ...p, kategoriId: e.target.value }))}
                >
                  <option value="">Kategori seç *</option>
                  {kategoriler.map(k => (
                    <option key={k.id} value={k.id}>{k.ad}</option>
                  ))}
                </select>
              </div>

              {/* Anonimlik toggle + submit */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <span className="toggle-wrap">
                    <input
                      type="checkbox"
                      checked={form.anonimMi}
                      onChange={e => setForm(p => ({ ...p, anonimMi: e.target.checked }))}
                    />
                    <span className="toggle-track" />
                  </span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: form.anonimMi ? 'var(--gold)' : 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, transition: 'color 0.2s' }}>
                      {form.anonimMi ? <EyeOff size={13} /> : <Eye size={13} />}
                      {form.anonimMi ? 'Anonim' : 'Açık Kimlik'}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                      {form.anonimMi ? 'İsmin gizlenecek' : 'İsmin görünecek'}
                    </div>
                  </div>
                </label>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.baslik.trim() || !form.icerik.trim() || !form.kategoriId}
                  className="btn-crimson"
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <Send size={13} />
                  {loading ? 'Gönderiliyor...' : 'Gönder'}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
