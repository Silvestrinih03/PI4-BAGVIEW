import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Aeroportos } from './aeroportos.schema';

@Injectable()
export class AeroportosService {
  constructor(
    @InjectModel(Aeroportos.name)
    private readonly aeroportosModel: Model<Aeroportos>,
  ) {}

  // Método para buscar todos os aeroportos
  async findAll(): Promise<Aeroportos[]> {
    // Retorna todos os documentos da coleção de aeroportos
    return this.aeroportosModel.find().exec();
  }

  // Método para buscar um aeroporto específico pelo ID de origem
  async findOne(origem: string): Promise<Aeroportos | null> {
    console.log('Buscando origem com id:', origem);
    try {
      // Busca o documento pelo ID de origem
      const voo = await this.aeroportosModel.findById(origem).exec();

      // Se o documento não for encontrado, lança uma exceção
      if (!voo) {
        throw new NotFoundException(`Origem com id ${origem} não encontrado`);
      }

      console.log('Resultado da busca:', voo);
      return voo;
    } catch (error) {
      // Loga o erro e lança a exceção
      console.error('Erro ao buscar voo:', error);
      throw error;
    }
  }
}
