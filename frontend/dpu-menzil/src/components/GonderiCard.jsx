// src/components/GonderiCard.jsx
import { useState } from 'react';
import { Heart, Bookmark, MessageCircle, Clock, User, EyeOff, MoreHorizontal } from 'lucide-react';

const TUR_CONFIG = {
  duyuru: { label: 'Duyuru', cls: 'tag-duyuru', icon: '📢' },
  oneri: { label: 'Öneri', cls: 'tag-oneri', icon: '💡' },
  sikayet: { label: 'Şikayet', cls: 'tag-sikayet', icon: '🚨' },
};

const STATUS_CONFIG = {
  approved: { label: 'Yayında', cls: 'status-approved' },
  pending: { label: 'Beklemede', cls: 'status-pending' },
  rejected: { label: 'Reddedildi', cls: 'status-rejected' },
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = (now - d) / 1000;
  if (diff < 60) return 'Az önce';
  if (diff < 3600) return `${Math.floor(diff / 60)} dk önce`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} sa önce`;
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
}

export default function GonderiCard({ gonderi, showStatus = false }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 40));

  const tur = TUR_CONFIG[gonderi.tur] || TUR_CONFIG.duyuru;
  const status = STATUS_CONFIG[gonderi.durum] || STATUS_CONFIG.pending;

  const handleLike = () => {
    setLiked(p => !p);
    setLikeCount(p => liked ? p - 1 : p + 1);
  };

  return (
    <div className="menzil-card" style={{ padding: '20px 22px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Avatar */}
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: gonderi.olusturan === 'Anonim'
              ? 'linear-gradient(135deg, rgba(74,96,128,0.4), rgba(30,45,74,0.6))'
              : 'linear-gradient(135deg, rgba(192,32,42,0.3), rgba(192,32,42,0.1))',
            border: `1px solid ${gonderi.olusturan === 'Anonim' ? 'rgba(74,96,128,0.4)' : 'rgba(192,32,42,0.25)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {gonderi.olusturan === 'Anonim'
              ? <EyeOff size={16} style={{ color: 'var(--text-muted)' }} />
              : <User size={16} style={{ color: 'var(--crimson-bright)' }} />
            }
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.88rem', color: gonderi.olusturan === 'Anonim' ? 'var(--text-muted)' : 'var(--text-primary)' }}>
              {gonderi.olusturan}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              <Clock size={11} style={{ color: 'var(--text-muted)' }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontFamily: 'Share Tech Mono, monospace' }}>
                {formatDate(gonderi.tarih)}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Category badge */}
          <span style={{
            background: 'var(--navy-mid)', border: '1px solid var(--navy-border)',
            borderRadius: 6, padding: '2px 8px', fontSize: '0.7rem',
            color: 'var(--text-muted)', fontFamily: 'Exo 2, sans-serif'
          }}>
            {gonderi.kategoriAd}
          </span>
          {/* Type tag */}
          <span className={`tag ${tur.cls}`}>{tur.icon} {tur.label}</span>
          {showStatus && (
            <span className={`tag ${status.cls}`} style={{ fontSize: '0.62rem' }}>{status.label}</span>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.3 }}>
        {gonderi.baslik}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 16 }}>
        {gonderi.icerik}
      </p>

      {/* Footer actions */}
      <div className="divider-gold" style={{ margin: '12px 0' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button
          onClick={handleLike}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '6px 12px', borderRadius: 8, border: 'none',
            background: liked ? 'rgba(192,32,42,0.12)' : 'transparent',
            color: liked ? 'var(--crimson-bright)' : 'var(--text-muted)',
            cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.82rem', fontWeight: 500
          }}
        >
          <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
          {likeCount}
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '6px 12px', borderRadius: 8, border: 'none',
          background: 'transparent', color: 'var(--text-muted)',
          cursor: 'pointer', fontSize: '0.82rem', fontWeight: 500
        }}>
          <MessageCircle size={14} />
          Yorum
        </button>
        <div style={{ flex: 1 }} />
        <button
          onClick={() => setSaved(p => !p)}
          style={{
            padding: '6px 10px', borderRadius: 8, border: 'none',
            background: saved ? 'rgba(212,160,23,0.12)' : 'transparent',
            color: saved ? 'var(--gold)' : 'var(--text-muted)',
            cursor: 'pointer', transition: 'all 0.2s'
          }}
        >
          <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
}
