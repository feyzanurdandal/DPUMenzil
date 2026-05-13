using DPUMenzil.Application.DTOs.UserDTOs;

namespace DPUMenzil.Application.Interfaces;

public interface IAuthService
{
    // Kayıt başarılıysa kullanıcıya bir hoş geldin mesajı veya token döneriz
    Task<string> RegisterAsync(UserRegisterDTO registerDto);
    
    // Giriş başarılıysa JWT Token döneriz
    Task<string> LoginAsync(UserLoginDTO loginDto);
}