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

  async findAll(): Promise<Aeroportos[]> {
    return this.aeroportosModel.find().exec();
  }

  async findOne(origem: string): Promise<Aeroportos | null> {
    console.log('Buscando origem com id:', origem);
    try {
      const voo = await this.aeroportosModel.findById(origem).exec();
      
      if (!voo) {
        throw new NotFoundException(`Origem com id ${origem} não encontrado`);
      }
      
      console.log('Resultado da busca:', voo);
      return voo;
    } catch (error) {
      console.error('Erro ao buscar voo:', error);
      throw error;
    }
  }

}