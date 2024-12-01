import { BadRequestException, Injectable } from '@nestjs/common';
import { DadosDto } from './dadosDto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class DadosService {
  constructor(private usersService: UsersService) {}

  async atualizarDados(dadosDto: DadosDto) {
    try {

      if (!dadosDto.fullName || dadosDto.fullName.trim() === '') {
        throw new BadRequestException('O nome completo não pode estar vazio.');
      }

      const dadosAtualizacao = {
        email: dadosDto.email,
        fullName: dadosDto.fullName,
        idPlan: dadosDto.plan,
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

  async alterarSenha(email: string, novaSenha: string) {
    try {
      if (!email || email.trim() === '') {
        throw new BadRequestException('O email é obrigatório.');
      }

      if (!novaSenha || novaSenha.trim() === '') {
        throw new BadRequestException('A senha não pode estar vazia.');
      }

      // Criptografar a nova senha
      //const senhaCriptografada = await bcrypt.hash(novaSenha, 10);

      // Atualizar a senha no banco de dados
      const usuarioAtualizado = await this.usersService.updateByEmail(email, {
        password: novaSenha,
      });

      if (!usuarioAtualizado) {
        throw new BadRequestException('Usuário não encontrado.');
      }

      return {
        message: 'Senha alterada com sucesso.',
      };
    } catch (error) {
      console.error('Erro ao alterar a senha:', error);
      throw error;
    }
  }
}
