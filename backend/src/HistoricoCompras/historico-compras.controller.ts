import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
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

  // Novo endpoint para buscar pelo ID do usuário
  @Get(':userId')
  async findByUserId(@Param('userId') userId: string): Promise<HistoricoCompras[]> {
    return this.historicoComprasService.findByUserId(userId);
  }

  // Novo endpoint para buscar pelo ID do usuário e condicaoId
  @Get(':userId/condicao/:condicaoId')
  async findByUserIdAndCondicao(
    @Param('userId') userId: string,
    @Param('condicaoId') condicaoId: string
  ): Promise<HistoricoCompras[]> {
    return this.historicoComprasService.findByUserIdAndCondicao(userId, condicaoId);
  }

  @Put(':id')
  async updateRegistro(@Param('id') id: string, @Body() registroAtualizado: any) {
    return this.historicoComprasService.updateRegistro(id, registroAtualizado);
  }
}