import { Controller, Patch, Body, Post, Put, BadRequestException } from '@nestjs/common';
import { DadosService } from './dados.service';
import { DadosDto } from './dadosDto';


@Controller('dados')
export class DadosController {
  constructor(private dadosService: DadosService) {}

  @Patch('atualizar')
  async atualizarDados(@Body() dadosDto: DadosDto) {
    return this.dadosService.atualizarDados(dadosDto);
  }

  @Put('alterar-senha')
  async alterarSenha(@Body() body: { email: string; novaSenha: string }) {
    const { email, novaSenha } = body;

    if (!email || email.trim() === '') {
      throw new BadRequestException('O email é obrigatório.');
    }

    if (!novaSenha || novaSenha.trim() === '') {
      throw new BadRequestException('A nova senha é obrigatória.');
    }

    return await this.dadosService.alterarSenha(email, novaSenha);
  }
}
