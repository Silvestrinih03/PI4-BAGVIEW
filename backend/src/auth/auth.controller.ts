import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

// Define um controlador para a rota 'auth'
@Controller('auth')
export class AuthController {
  // Injeta o serviço de autenticação no controlador
  constructor(private authService: AuthService) {}

  // Define um endpoint POST para 'login'
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    // Chama o método de login do serviço de autenticação
    return this.authService.login(loginDto);
  }
}
