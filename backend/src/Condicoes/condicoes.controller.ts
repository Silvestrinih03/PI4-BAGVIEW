import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CondicoesService } from './condicoes.service';


@Controller('condicoes')
export class CondicoesController {
  constructor(private condicoesService: CondicoesService) {}

  @Get()
  async findAll() {
    return this.condicoesService.findAll();
  }

  // Nova rota para buscar uma condição pelo id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.condicoesService.findOne(id);
  }
}