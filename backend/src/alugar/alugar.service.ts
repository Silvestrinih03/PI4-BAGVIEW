import { Injectable } from '@nestjs/common';
import { AlugarDto } from './alugarDto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AlugarService {
  constructor(private usersService: UsersService) {}

  async alugarTag(alugarDto: AlugarDto) {
    try {
        console.log("Dados recebidos:", alugarDto);

      // Dados para atualização
      const dadosAtualizacao = {
        inactiveTags: alugarDto.inactiveTags as number // Garantindo que seja do tipo primitivo number
      };

      // Atualiza o usuário pelo email
      const usuarioAtualizado = await this.usersService.updateByEmail(
        alugarDto.email,
        dadosAtualizacao
      );

      // Verifica se o usuário foi atualizado com sucesso
      if (!usuarioAtualizado) {
        throw new Error('Usuário não encontrado ou não atualizado');
      }

      return {
        message: 'O usuário alugou a(s) tag(s) com sucesso',
      };
    } catch (error) {
      console.error('Erro ao alugar a(s) tag(s):', error);
      throw error; // Lança o erro para ser tratado em outro lugar
    }
  }
}
