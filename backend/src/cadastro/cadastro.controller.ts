import { Controller, Post, Body } from '@nestjs/common';
import { CadastroService } from './cadastro.service';
import { CadastroDto } from './cadastroDto';

@Controller('cadastro')
export class CadastroController {
  constructor(private cadastroService: CadastroService) {}

  @Post()
  async cadastrar(@Body() cadastroDto: CadastroDto) {
    return this.cadastroService.cadastrar(cadastroDto);
  }
}