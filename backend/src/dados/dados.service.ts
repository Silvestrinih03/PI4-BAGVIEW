import { Injectable } from '@nestjs/common';
import { DadosDto } from './dadosDto';
import { UsersService } from '../users/users.service';

@Injectable()
export class DadosService {
  constructor(private usersService: UsersService) {}

  async atualizarDados(dadosDto: DadosDto) {
    try {
      const dadosAtualizacao = {
        fullName: dadosDto.fullName,
        email: dadosDto.email,
        password: dadosDto.password
      };

      const usuarioAtualizado = await this.usersService.updateByEmail(
        dadosDto.email,
        dadosAtualizacao
      );

      return {
        message: 'Dados de pagamento atualizados com sucesso',
      };
    } catch (error) {
      console.error('Erro ao atualizar dados de pagamento:', error);
      throw error;
    }
  }
}
