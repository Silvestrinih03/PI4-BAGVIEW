import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { AeroportosService } from './aeroportos.service';
import { Aeroportos } from './aeroportos.schema';

// Define um controlador para a rota 'aeropotos'
@Controller('aeropotos')
export class AeroportosController {
  // Injeta o serviço AeroportosService no controlador
  constructor(private readonly aeroportosService: AeroportosService) {}

  // Define um endpoint GET para buscar todos os aeroportos
  @Get()
  async findAll(): Promise<Aeroportos[]> {
    // Chama o serviço para obter todos os aeroportos
    return this.aeroportosService.findAll();
  }

  // Define um endpoint GET para buscar um aeroporto específico pela origem
  @Get(':origem')
  async findOne(@Param('origem') origem: string): Promise<Aeroportos | null> {
    try {
      // Chama o serviço para obter um aeroporto específico
      return await this.aeroportosService.findOne(origem);
    } catch (error) {
      // Lança o erro caso ocorra
      throw error;
    }
  }
}
