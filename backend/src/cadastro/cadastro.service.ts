import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CadastroDto } from './cadastroDto';

@Injectable()
export class CadastroService {
  constructor(private usersService: UsersService) {}

  // Funcao de cadastro de usuario
  async cadastrar(cadastroDto: CadastroDto) {
    
    console.log('Iniciando processo de registro');
    console.log('Dados recebidos:', JSON.stringify(cadastroDto));

    try {
      // Verificar se o usuário já existe
      const existingUser = await this.usersService.findOne(cadastroDto.email);
      if (existingUser) {
        console.log('Usuário já existe');
        throw new ConflictException('Email já está em uso');
      }

      // Criar novo usuário
      const newUser = await this.usersService.create(cadastroDto);
      console.log('Novo usuário criado:', JSON.stringify(newUser));

      return {
        message: 'Registro realizado com sucesso',
        user: {
          email: newUser.email,
        }
      };
    } catch (error) {
      console.error('Erro durante o processo de registro:', error);
      throw error;
    }
  }
}