// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5127/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('menzil_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('menzil_token');
      localStorage.removeItem('menzil_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;

// Mock data for demo (when backend not available)
export const MOCK_KATEGORILER = [
  { id: 1, ad: 'Yemekhane', aciklama: 'Yemek ve kafeterya konuları', icon: '🍽️' },
  { id: 2, ad: 'Ring Seferleri', aciklama: 'Ulaşım ve servis', icon: '🚌' },
  { id: 3, ad: 'Kütüphane', aciklama: 'Kütüphane hizmetleri', icon: '📚' },
  { id: 4, ad: 'Akademik', aciklama: 'Ders ve akademik konular', icon: '🎓' },
  { id: 5, ad: 'Sosyal Alan', aciklama: 'Kampüs sosyal alanları', icon: '🏛️' },
  { id: 6, ad: 'Spor', aciklama: 'Spor tesisleri ve etkinlikler', icon: '⚽' },
  { id: 7, ad: 'Genel', aciklama: 'Genel konular', icon: '💬' },
];

export const MOCK_GONDERILER = [
  { id: 1, baslik: 'Yemekhane sırası çok uzun', icerik: 'Öğle saatlerinde yemekhane girişindeki kuyruk 30 dakikayı geçiyor. Daha fazla kasa açılabilir mi?', tur: 'sikayet', durum: 'approved', olusturan: 'Anonim', kategoriAd: 'Yemekhane', tarih: '2025-01-10T10:30:00' },
  { id: 2, baslik: 'Ring güzergahına yeni durak eklenmeli', icerik: 'Mühendislik Fakültesi arkasından ring geçmiyor, öğrenciler 10 dk yürümek zorunda kalıyor.', tur: 'oneri', durum: 'approved', olusturan: 'Ahmet Yılmaz', kategoriAd: 'Ring Seferleri', tarih: '2025-01-09T14:20:00' },
  { id: 3, baslik: 'Kütüphane çalışma saatleri uzatılsın', icerik: 'Sınav dönemlerinde kütüphane saat 23:00\'de kapanıyor. Gece yarısına kadar açık kalsa çok faydalı olur.', tur: 'oneri', durum: 'approved', olusturan: 'Zeynep K.', kategoriAd: 'Kütüphane', tarih: '2025-01-08T16:45:00' },
  { id: 4, baslik: '📢 Bahar Dönemi Kayıt Tarihleri Açıklandı', icerik: 'Bahar dönemi ders kayıtları 15 Ocak - 20 Ocak tarihleri arasında yapılacaktır. Tüm öğrencilerin belirlenen süre içinde kayıtlarını tamamlaması gerekmektedir.', tur: 'duyuru', durum: 'approved', olusturan: 'Öğrenci İşleri', kategoriAd: 'Akademik', tarih: '2025-01-07T09:00:00' },
  { id: 5, baslik: 'Spor salonu ekipmanları yenilenmeli', icerik: 'Fitness salonundaki bazı aletler bozuk ve güvenli değil. Bakım yapılması gerekiyor.', tur: 'sikayet', durum: 'pending', olusturan: 'Anonim', kategoriAd: 'Spor', tarih: '2025-01-06T11:30:00' },
  { id: 6, baslik: 'Kafeteryaya vejetaryen menü eklenmeli', icerik: 'Et tüketmeyen öğrenciler için alternatif menü seçenekleri sunulması büyük bir ihtiyaç.', tur: 'oneri', durum: 'approved', olusturan: 'Anonim', kategoriAd: 'Yemekhane', tarih: '2025-01-05T13:00:00' },
];
