using DPUMenzil.Core.Entities;

namespace DPUMenzil.Application.Interfaces;

public interface IJwtService
{
    string GenerateToken(Kullanici kullanici);
}