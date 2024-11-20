import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Condicoes, CondicoesDocument } from './condicoes.schema';

@Injectable()
export class CondicoesService {
  constructor(@InjectModel(Condicoes.name) private condicoesModel: Model<CondicoesDocument>) {}

  // async findOne(numVoo: string): Promise<Condicoes | null> {
  //   console.log('Buscando voo com número:', numVoo);
  //   try {
  //     const voo = await this.voosModel.findOne({ numVoo: numVoo }).exec();
      
  //     console.log('Resultado da busca:', voo);
      
  //     if (!voo) {
  //       const todosCondicoes = await this.voosModel.find().exec();
  //       console.log('Todos os voos no banco:', todosCondicoes);
        
  //       throw new NotFoundException(`Voo com número ${numVoo} não encontrado`);
  //     }
      
  //     return voo;
  //   } catch (error) {
  //     console.error('Erro ao buscar voo:', error);
  //     throw error;
  //   }
  // }

  async findAll(): Promise<Condicoes[]> {
    console.log('Buscando todos os condicoes');
    try {
      const condicoes = await this.condicoesModel.find().exec();
      console.log('Condições encontrados:', JSON.stringify(condicoes, null, 2));
      return condicoes;
    } catch (error) {
      console.error('Erro ao buscar condicoes:', error);
      throw error;
    }
  }

}