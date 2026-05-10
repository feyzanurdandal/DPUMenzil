using DPUMenzil.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using DPUMenzil.Core.Interfaces;
using DPUMenzil.Infrastructure.Repositories;
// Önce yukarıya using ekle:
using DPUMenzil.Infrastructure.Services;
using DPUMenzil.Application.Interfaces;



var builder = WebApplication.CreateBuilder(args);

// 1. PostgreSQL Bağlantısını Kaydet
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<IKategoriRepository, KategoriRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// builder.Build() satırından önce ekle:
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();

var app = builder.Build();

// 2. OTOMASYON: Uygulama her çalıştığında veritabanını kontrol et ve tabloları oluştur
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