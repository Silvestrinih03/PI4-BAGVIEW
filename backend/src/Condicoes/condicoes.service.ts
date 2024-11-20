import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Condicoes, CondicoesDocument } from './condicoes.schema';

@Injectable()
export class CondicoesService {
  constructor(@InjectModel(Condicoes.name) private condicoesModel: Model<CondicoesDocument>) {}

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

  // Método para buscar uma condição pelo id
  async findOne(id: string): Promise<Condicoes> {
    console.log(`Buscando condicao com id: ${id}`);
    try {
      // Converta o id para ObjectId
      const objectId = new Types.ObjectId(id);  // Converte a string para ObjectId
      const condicao = await this.condicoesModel.findOne({ _id: objectId }).exec();  // Use ObjectId no filtro
      if (!condicao) {
        throw new NotFoundException(`Condição com id ${id} não encontrada`);
      }
      console.log('Condição encontrada:', JSON.stringify(condicao, null, 2));
      return condicao;
    } catch (error) {
      console.error('Erro ao buscar condição:', error);
      throw error;
    }
  }

}