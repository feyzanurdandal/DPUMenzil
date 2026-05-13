// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Zap, Shield, ChevronRight } from 'lucide-react';

export default function LoginPage() {
  // Backend UserLoginDTO: Email ve Sifre bekliyor.
  const [form, setForm] = useState({ email: '', sifre: '' }); 
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      setError('Kayıt özelliği yakında aktif olacak.');
      return;
    }

    // AuthContext üzerindeki login fonksiyonu backend'e isteği atar.
    const result = await login(form);

    if (result.success) {
      // Başarılıysa AuthContext içindeki state güncellenir ve yönlendirme yapılır.
      navigate('/');
    } else {
      // Hata durumunda backend'den gelen mesajı gösteriyoruz.
      setError(result.error || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    } 
  };

  return (
    <div className="min-h-screen grid-bg hero-accent flex items-center justify-center p-4 relative overflow-hidden">
      {/* Arka Plan Süslemeleri */}
      <div style={{
        position: 'absolute', top: '10%', left: '5%',
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(192,32,42,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '8%',
        width: 250, height: 250,
        background: 'radial-gradient(circle, rgba(212,160,23,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="animate-fade-in" style={{ width: '100%', maxWidth: 440 }}>
        {/* Logo ve Başlık */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 72, height: 72, borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(192,32,42,0.2), rgba(212,160,23,0.1))',
            border: '1px solid rgba(192,32,42,0.3)',
            marginBottom: 16,
            boxShadow: '0 0 30px rgba(192,32,42,0.15)'
          }}>
            <Shield size={36} style={{ color: 'var(--crimson-bright)' }} />
          </div>
          <h1 className="font-rajdhani text-glow-gold" style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.06em', lineHeight: 1 }}>
            DPÜ MENZİL
          </h1>
          <p className="font-mono-tech" style={{ color: 'var(--text-muted)', fontSize: '0.72rem', letterSpacing: '0.15em', marginTop: 6 }}>
            DUMLUPINAR ÜNİVERSİTESİ // KAMPÜS PLATFORMU
          </p>
        </div>

        {/* Giriş Kartı */}
        <div className="menzil-card animate-slide-in" style={{ padding: 32 }}>
          {/* Sekme Değiştirici */}
          <div style={{ display: 'flex', gap: 4, background: 'var(--navy-mid)', borderRadius: 10, padding: 4, marginBottom: 28 }}>
            {['Giriş Yap', 'Kayıt Ol'].map((tab, i) => (
              <button
                key={tab}
                type="button"
                onClick={() => { setIsRegister(i === 1); setError(''); }}
                style={{
                  flex: 1, padding: '8px 0', borderRadius: 8, border: 'none',
                  background: isRegister === (i === 1) ? 'linear-gradient(135deg, var(--crimson), #a01820)' : 'transparent',
                  color: isRegister === (i === 1) ? 'white' : 'var(--text-muted)',
                  fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
                  fontSize: '0.9rem', letterSpacing: '0.05em',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {isRegister && (
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: 6, fontWeight: 600 }}>
                  AD SOYAD
                </label>
                <input className="menzil-input" placeholder="Adınız Soyadınız" />
              </div>
            )}

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: 6, fontWeight: 600 }}>
                E-POSTA ADRESİ
              </label>
              <input
                type="email"
                className="menzil-input"
                placeholder="ogrenci@dpu.edu.tr"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: 6, fontWeight: 600 }}>
                ŞİFRE
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="menzil-input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.sifre}
                  onChange={e => setForm(p => ({ ...p, sifre: e.target.value }))}
                  style={{ paddingRight: 44 }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ background: 'rgba(192,32,42,0.12)', border: '1px solid rgba(192,32,42,0.3)', borderRadius: 8, padding: '10px 14px', color: '#f87171', fontSize: '0.85rem' }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn-crimson" disabled={loading} style={{ marginTop: 4, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Zap size={15} />
              {loading ? 'Sistem Doğrulanıyor...' : isRegister ? 'Hesap Oluştur' : 'Giriş Yap'}
              <ChevronRight size={15} />
            </button>
          </form>

          <div className="divider-gold" />

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            DPÜ Menzil Ağına Güvenli Erişim
          </p>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--text-muted)', fontSize: '0.78rem', letterSpacing: '0.05em' }}>
          KÜTAHYA DUMLUPINAR ÜNİVERSİTESİ © 2026
        </p>
      </div>
    </div>
  );
}