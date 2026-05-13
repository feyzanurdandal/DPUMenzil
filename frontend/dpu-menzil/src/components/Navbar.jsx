// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, LogOut, User, Settings, Menu, X, Shield } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const rolLabel = {
    ogrenci: 'Öğrenci',
    idariPersonel: 'İdari Personel',
    admin: 'Admin',
  }[user?.rol] || 'Kullanıcı';

  const rolColor = {
    ogrenci: 'var(--text-secondary)',
    idariPersonel: 'var(--gold)',
    admin: 'var(--crimson-bright)',
  }[user?.rol] || 'var(--text-secondary)';

  return (
    <nav className="navbar-menzil">
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: 'linear-gradient(135deg, rgba(192,32,42,0.25), rgba(212,160,23,0.1))',
            border: '1px solid rgba(192,32,42,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Shield size={18} style={{ color: 'var(--crimson-bright)' }} />
          </div>
          <div>
            <span className="font-rajdhani text-glow-gold" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.05em' }}>
              DPÜ MENZİL
            </span>
          </div>
        </Link>

        {/* Center links (desktop) */}
        <div style={{ display: 'flex', gap: 4 }} className="hidden md:flex">
          {[
            { to: '/', label: 'Akış' },
            ...(user?.rol === 'idariPersonel' || user?.rol === 'admin' ? [{ to: '/panel', label: 'Yönetim Paneli' }] : []),
            ...(user?.rol === 'admin' ? [{ to: '/admin', label: 'Admin' }] : []),
          ].map(link => (
            <Link key={link.to} to={link.to} style={{
              padding: '6px 14px', borderRadius: 8, textDecoration: 'none',
              color: 'var(--text-secondary)', fontWeight: 600,
              fontFamily: 'Rajdhani, sans-serif', fontSize: '0.88rem',
              letterSpacing: '0.04em', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{ background: 'none', border: '1px solid var(--navy-border)', borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--navy-border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <Bell size={16} />
          </button>

          {/* User chip */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--navy-mid)', border: '1px solid var(--navy-border)',
            borderRadius: 10, padding: '5px 12px 5px 8px',
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: 6,
              background: 'linear-gradient(135deg, var(--crimson), rgba(192,32,42,0.5))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <User size={14} style={{ color: 'white' }} />
            </div>
            <div style={{ lineHeight: 1 }}>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.82rem', fontFamily: 'Rajdhani, sans-serif' }}>
                {user?.ad || user?.kullaniciAdi || 'Kullanıcı'}
              </div>
              <div style={{ color: rolColor, fontSize: '0.65rem', fontFamily: 'Share Tech Mono, monospace', letterSpacing: '0.05em' }}>
                {rolLabel}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{ background: 'none', border: '1px solid rgba(192,32,42,0.3)', borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--crimson-bright)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(192,32,42,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
            title="Çıkış Yap"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </nav>
  );
}
