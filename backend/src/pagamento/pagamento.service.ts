import { Injectable } from '@nestjs/common';
import { PagamentoDto } from './pagamentoDto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PagamentoService {
  constructor(private usersService: UsersService) {}

  async atualizarPagamento(pagamentoDto: PagamentoDto) {
    try {
      const dadosAtualizacao = {
        card: pagamentoDto.card
      };

      const usuarioAtualizado = await this.usersService.updateByEmail(
        pagamentoDto.email,
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
