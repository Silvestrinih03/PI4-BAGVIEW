import { Controller, Post, Body } from '@nestjs/common';
import { CadastroService } from './cadastro.service';
import { CadastroDto } from './cadastroDto';

@Controller('cadastro')
export class CadastroController {
  constructor(private cadastroService: CadastroService) {}

  // Chama funcao de cadastro de usuario de CadastroService
  // CadastroDto é o DTO que define o formato dos dados que serão enviados para o banco de dados
  @Post()
  async cadastrar(@Body() cadastroDto: CadastroDto) {
    return this.cadastroService.cadastrar(cadastroDto);
  }
}