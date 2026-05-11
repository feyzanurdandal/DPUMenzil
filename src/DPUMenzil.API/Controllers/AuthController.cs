using DPUMenzil.Application.DTOs.UserDTOs;
using DPUMenzil.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DPUMenzil.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterDTO registerDto)
    {
        try
        {
            var result = await _authService.RegisterAsync(registerDto);
            return Ok(new { message = result });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDTO loginDto)
    {
        try
        {
            var result = await _authService.LoginAsync(loginDto);
            return Ok(new { message = result });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}