import { Controller, Patch, Body } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoDto } from './pagamentoDto';

@Controller('pagamento')
export class PagamentoController {
  constructor(private pagamentoService: PagamentoService) {}

  @Patch('atualizar')
  async atualizarPagamento(@Body() pagamentoDto: PagamentoDto) {
    return this.pagamentoService.atualizarPagamento(pagamentoDto);
  }
}
