# DPÜ Menzil | Akıllı Kampüs İletişim Platformu

[![.NET 10](https://img.shields.io/badge/.NET-10.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Cyber Security](https://img.shields.io/badge/Security-Focus-red?logo=dependabot)](https://github.com/features/security)

**DPÜ Menzil**, Kütahya Dumlupınar Üniversitesi öğrencileri ve personeli için geliştirilmiş; kampüs içi duyuru, geri bildirim ve anlık iletişim odaklı bir platformdur. Proje, modern yazılım mimarileri ve siber güvenlik standartları (OWASP prensipleri) göz önünde bulundurularak inşa edilmektedir.

---

## Mimari Özellikler

Proje **Clean Architecture** (Temiz Mimari) prensiplerine sadık kalınarak 4 ana katman üzerine kurgulanmıştır:

* **API:** İsteklerin karşılandığı ve yetkilendirmelerin yapıldığı giriş noktası.
* **Application:** İş mantığı, DTO yönetimi ve servislerin (Auth, Post vb.) bulunduğu beyin katmanı.
* **Core (Domain):** Varlıklar (Entities) ve arayüzlerin (Interfaces) bulunduğu, dışa bağımlılığı olmayan merkez.
* **Infrastructure:** Veritabanı yapılandırması (EF Core) ve dış kütüphane entegrasyonlarının (BCrypt) yönetildiği katman.

---

## Siber Güvenlik Yaklaşımı

* **Parola Güvenliği:** Kullanıcı şifreleri veritabanına asla düz metin olarak kaydedilmez. **BCrypt (Salted Hash)** algoritması ile korunur.
* **Veri İzolasyonu:** Tahmin edilebilir ID saldırılarını (IDOR) önlemek amacıyla tüm tablolarda **UUID (Guid)** kullanılmaktadır.
* **DTO Kullanımı:** Veritabanı modelleri asla doğrudan dışarıya açılmaz; veri transferleri DTO üzerinden güvenli bir şekilde yapılır.

---

## Kurulum ve Çalıştırma Rehberi

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları sırasıyla uygulayın:

### 1. Hazırlık
* Bilgisayarınızda **Docker Desktop** ve **.NET 10 SDK** kurulu olduğundan emin olun.
* Terminalden proje klasörüne gidin: `cd DPUMenzil`

### 2. Veritabanını Başlatma (Docker)
PostgreSQL konteynerini arka planda ayağa kaldırın:
```powershell
docker compose up -d
```

### 3. Bağımlılıkların Yüklenmesi
```powershell
dotnet restore
```

### 4. Veritabanı Şemasını Güncelleme
Migration'ları veritabanına uygulayarak tabloları oluşturun:
```powershell
dotnet ef database update --project src\DPUMenzil.API
```

### 5. Uygulamayı Başlatma
```powershell
dotnet run --project src\DPUMenzil.API
```
* **Scaler URL:** Uygulama çalıştıktan sonra http://localhost:5127/scalar/v1 adresinden API'yi test edebilirsiniz. (port numarası değişkenlik gösterebilir uygulamayı başlattıktan sonra terminalde hangi port üzerinden test edebileceğiniz görünür.)

---
## Projeyi Kapatma ve Temizlik

Çalışmanızı bitirdiğinizde sistem kaynaklarını serbest bırakmak için:

### 1. API'yi Durdurun
Terminalde Ctrl + C tuşlarına basın.

### 2. Konteynerleri Kapatın:
```powershell
docker compose down
```
---
## Geliştirici
Feyza Nur Dandal - Kütahya Dumlupınar Üniversitesi, Yazılım Mühendisliği