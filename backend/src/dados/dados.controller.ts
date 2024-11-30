import { Controller, Patch, Body, Post } from '@nestjs/common';
import { DadosService } from './dados.service';
import { DadosDto } from './dadosDto';


@Controller('dados')
export class DadosController {
  constructor(private dadosService: DadosService) {}

  @Patch('atualizar')
  async atualizarDados(@Body() dadosDto: DadosDto) {
    return this.dadosService.atualizarDados(dadosDto);
  }
}
