import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Voos, VoosDocument } from './voos.schema';

@Injectable()
export class VoosService {
  constructor(@InjectModel(Voos.name) private voosModel: Model<VoosDocument>) {}

  async findOne(numVoo: string): Promise<Voos | null> {
    console.log('Buscando voo com número:', numVoo);
    try {
      const voo = await this.voosModel.findOne({ numvoo: numVoo }).exec();
      
      console.log('Resultado da busca:', voo);
      
      if (!voo) {
        const todosVoos = await this.voosModel.find().exec();
        console.log('Todos os voos no banco:', todosVoos);
        
        throw new NotFoundException(`Voo com número ${numVoo} não encontrado`);
      }
      
      return voo;
    } catch (error) {
      console.error('Erro ao buscar voo:', error);
      throw error;
    }
  }

  async findAll(): Promise<Voos[]> {
    console.log('Buscando todos os voos');
    try {
      const voos = await this.voosModel.find().exec();
      console.log('Voos encontrados:', JSON.stringify(voos, null, 2));
      return voos;
    } catch (error) {
      console.error('Erro ao buscar voos:', error);
      throw error;
    }
  }

}