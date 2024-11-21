import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { AeroportosService } from './aeroportos.service';
import { Aeroportos } from './aeroportos.schema';

@Controller('aeropotos')
export class AeroportosController {
  constructor(private readonly aeroportosService: AeroportosService) {}

  @Get()
  async findAll(): Promise<Aeroportos[]> {
    return this.aeroportosService.findAll();
  }
}