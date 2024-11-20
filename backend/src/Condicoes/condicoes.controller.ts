import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CondicoesService } from './condicoes.service';


@Controller('condicoes')
export class CondicoesController {
  constructor(private condicoesService: CondicoesService) {}

  @Get()
  async findAll() {
    return this.condicoesService.findAll();
  }


  // @Get(':numVoo')
  // findOne(@Param('numVoo') numVoo: string) {
  //   return this.voosService.findOne(numVoo);
  // }

}