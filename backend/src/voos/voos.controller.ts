import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VoosService } from './voos.service';


@Controller('voos')
export class VoosController {
  constructor(private voosService: VoosService) {}

  @Get()
  async findAll() {
    return this.voosService.findAll();
  }


  @Get(':numVoo')
  findOne(@Param('numVoo') numVoo: string) {
    return this.voosService.findOne(numVoo);
  }

}