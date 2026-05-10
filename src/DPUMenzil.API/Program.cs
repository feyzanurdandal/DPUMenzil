using DPUMenzil.Application.Interfaces;
using DPUMenzil.Application.Services;
using DPUMenzil.Core.Interfaces;
using DPUMenzil.Infrastructure.Persistence;
using DPUMenzil.Infrastructure.Persistence.Repositories; // Klasör yolunu kontrol et
using DPUMenzil.Infrastructure.Repositories;
using DPUMenzil.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. PostgreSQL Bağlantısı
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// 2. Repository Kayıtları
builder.Services.AddScoped<IKullaniciRepository, KullaniciRepository>(); // Kritik eksik burasıydı!
builder.Services.AddScoped<IKategoriRepository, KategoriRepository>();

// 3. Servis Kayıtları (Siber Güvenlik ve İş Mantığı)
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 4. OTOMASYON: Migration'ları otomatik uygula
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate(); 
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.Run();