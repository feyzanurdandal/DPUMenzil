using DPUMenzil.Application.Interfaces;
using BCrypt.Net;

namespace DPUMenzil.Infrastructure.Services;

public class PasswordHasher : IPasswordHasher
{
    public string HashPassword(string password)
    {
        // BCrypt otomatik olarak 'Salt' üretir ve hash'in içine gömer.
        return BCrypt.Net.BCrypt.HashPassword(password);
    }
    public bool VerifyPassword(string password, string hashedPassword)
    {
        // Veritabanındaki hash ile kullanıcının girdiği şifreyi karşılaştırır.

        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }

}