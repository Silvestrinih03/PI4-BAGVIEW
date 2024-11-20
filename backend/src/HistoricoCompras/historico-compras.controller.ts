import { Controller, Post, Get, Body } from '@nestjs/common';
import { HistoricoComprasService } from './historico-compras.service';
import { HistoricoCompras } from './historico-compras.schema';

@Controller('historicoCompras')
export class HistoricoComprasController {
  constructor(private readonly historicoComprasService: HistoricoComprasService) {}

  @Post()
  async create(@Body() data: Partial<HistoricoCompras>): Promise<HistoricoCompras> {
    return this.historicoComprasService.create(data);
  }

  @Get()
  async findAll(): Promise<HistoricoCompras[]> {
    return this.historicoComprasService.findAll();
  }
}