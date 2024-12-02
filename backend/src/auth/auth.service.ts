import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Serviço para gerenciar usuários
    private jwtService: JwtService, // Serviço para manipulação de JWT
  ) {}

  // Função de login de usuário
  async login(loginDto: { email: string; password: string }) {
    console.log('Iniciando processo de login'); // Log para indicar início do login
    console.log('Dados recebidos:', JSON.stringify(loginDto)); // Log dos dados recebidos

    try {
      const user = await this.usersService.findOne(loginDto.email); // Busca o usuário pelo email
      console.log(
        'Resultado da busca do usuário:',
        JSON.stringify(user, null, 2),
      ); // Log do resultado da busca

      // Verifica se o usuário existe
      if (!user) {
        console.log('Usuário não encontrado'); // Log se o usuário não for encontrado
        throw new UnauthorizedException('Credenciais inválidas'); // Lança exceção se o usuário não existir
      }

      // Verifica se a senha do usuário é igual à senha recebida
      if (user.password !== loginDto.password) {
        console.log('Senhas não correspondem'); // Log se as senhas não corresponderem
        throw new UnauthorizedException('Credenciais inválidas'); // Lança exceção se as senhas não corresponderem
      }

      console.log('Autenticação bem-sucedida'); // Log para indicar sucesso na autenticação
      return {
        message: 'Login bem-sucedido', // Mensagem de sucesso
        user: {
          email: user.email, // Retorna o email do usuário autenticado
        },
      };
    } catch (error) {
      console.error('Erro durante o processo de login:', error); // Log de erro
      throw error; // Lança o erro para ser tratado em outro lugar
    }
  }
}
