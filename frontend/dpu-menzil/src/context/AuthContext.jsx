// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

// Token içindeki gizli bilgileri (Ad, Rol vb.) okumak için yardımcı fonksiyon
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload = JSON.parse(jsonPayload);
    
    // Senin token yapına göre eşleme yapıyoruz:
    return {
      id: payload.sub,
      email: payload.email,
      ad: payload.AdSoyad, // Token içindeki "AdSoyad" alanı
      rol: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] // .NET Role claim'i
    };
  } catch (e) {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('menzil_token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const userData = parseJwt(token);
      if (userData) setUser(userData);
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // Backend'e istek atıyoruz
      const res = await api.post('/Auth/login', credentials);
      
      // 🚀 KRİTİK DÜZELTME: Senin backend token'ı "message" anahtarıyla dönüyor
      const jwt = res.data.message; 

      if (jwt) {
        // Token'ı çözüp kullanıcı bilgilerini alıyoruz
        const userData = parseJwt(jwt);
        
        setToken(jwt);
        setUser(userData);
        
        localStorage.setItem('menzil_token', jwt);
        localStorage.setItem('menzil_user', JSON.stringify(userData));
        
        return { success: true };
      }
      return { success: false, error: 'Token alınamadı' };
    } catch (err) {
      console.error("Giriş Hatası:", err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'E-posta veya şifre hatalı!' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('menzil_token');
    localStorage.removeItem('menzil_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);