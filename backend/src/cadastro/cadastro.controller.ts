import { Controller, Post, Body } from '@nestjs/common';
import { CadastroService } from './cadastro.service';

@Controller('cadastro')
export class CadastroController {
  constructor(private cadastroService: CadastroService) {}

  @Post()
  async cadastrar(@Body() cadastroDto: { email: string; password: string }) {
    return this.cadastroService.cadastrar(cadastroDto);
  }
}