# 🚀 DPÜ Menzil

Dumlupınar Üniversitesi kampüs içi iletişim, duyuru ve geri bildirim platformu. Bu proje, **Clean Architecture** prensipleri ve **Siber Güvenlik** odaklı veritabanı mimarisi ile geliştirilmiştir.

## 🛠️ Teknolojiler
*   **.NET 10 SDK**
*   **Entity Framework Core** (PostgreSQL Provider)
*   **Docker & Docker Compose**
*   **PostgreSQL**
*   **Swagger/OpenAPI**

## 📂 Proje Klasör Yapısı

```text
DPUMenzil/
├── src/
│   ├── DPUMenzil.API/             # Web API Katmanı (Controller, Program.cs)
│   ├── DPUMenzil.Core/            # Core Katmanı (Entities, Enums)
│   │   ├── Entities/              # Veritabanı Varlıkları (Kullanici, Gonderi)
│   │   └── Enums/                 # Tanımlayıcı Sabitler (KullaniciRolu, GonderiDurumu)
│   └── DPUMenzil.Infrastructure/  # Altyapı Katmanı (EF Core, Persistence)
│       └── Persistence/           # DbContext ve Configuration Ayarları
├── docker-compose.yml             # PostgreSQL Docker Konfigürasyonu
├── DPUMenzil.sln                  # Solution (Çözüm) Dosyası
└── README.md                      # Proje Dokümantasyonu
```

## 🏗️ Proje Yapısı
*   **DPUMenzil.API:** Giriş noktası ve API uçları.
*   **DPUMenzil.Core:** Domain modelleri (Entities), Enum yapıları ve temel iş mantığı.
*   **DPUMenzil.Infrastructure:** Veritabanı yapılandırması (EF Core), Persistence klasörü ve dış servis entegrasyonları.

## 💻 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda ayağa kaldırmak için aşağıdaki adımları takip edin:

### 1. Gereksinimler
*   Docker Desktop yüklü ve çalışır durumda olmalıdır.
*   .NET 10 SDK yüklü olmalıdır.

### 2. Veritabanını Başlatın (Docker)
Proje ana dizininde PostgreSQL konteynerini ayağa kaldırın:
```powershell
docker-compose up -d
```
### 3. Veritabanı Şemasını Oluşturun (Migration)
Tabloların PostgreSQL üzerinde fiziksel olarak oluşması için migration'ları uygulayın:
```powershell
dotnet ef database update --project src\DPUMenzil.API
```
### 4. Uygulamayı Çalıştırın
```powershell
dotnet run --project src\DPUMenzil.API
```

### Commit İşlemi

```powershell
git add .
git commit -m "yaptıklarınızı buraya yazarak ekleyin"
git push
```
