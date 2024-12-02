import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // Funcao de login de usuario
  async login(loginDto: { email: string; password: string }) {
    console.log('Iniciando processo de login');
    console.log('Dados recebidos:', JSON.stringify(loginDto));

    try {
      const user = await this.usersService.findOne(loginDto.email);
      console.log('Resultado da busca do usuário:', JSON.stringify(user, null, 2));

      // Verifica se o usuario existe
      if (!user) {
        console.log('Usuário não encontrado');
        throw new UnauthorizedException('Credenciais inválidas');
      }

      // Verifica se a senha do usuario é igual a senha recebida
      if (user.password !== loginDto.password) {
        console.log('Senhas não correspondem');
        throw new UnauthorizedException('Credenciais inválidas');
      }

      console.log('Autenticação bem-sucedida');
      return {
        message: 'Login bem-sucedido',
        user: {
          email: user.email,        }
      };
    } catch (error) {
      console.error('Erro durante o processo de login:', error);
      throw error;
    }
  }
}
