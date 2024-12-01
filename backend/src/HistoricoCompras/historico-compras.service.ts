import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistoricoCompras } from './historico-compras.schema';

@Injectable()
export class HistoricoComprasService {
  constructor(
    @InjectModel(HistoricoCompras.name)
    private readonly historicoComprasModel: Model<HistoricoCompras>,
  ) {}

  async create(data: Partial<HistoricoCompras>): Promise<HistoricoCompras> {
    try {
      const novoRegistro = new this.historicoComprasModel(data);
      return await novoRegistro.save();
    } catch (error) {
      console.error('Erro ao salvar no banco de dados:', error);
      throw error;
    }
  }

  async findAll(): Promise<HistoricoCompras[]> {
    return this.historicoComprasModel.find().exec();
  }

  async findByUserId(userId: string): Promise<HistoricoCompras[]> {
    try {
      return this.historicoComprasModel.find({ userId }).exec();
    } catch (error) {
      console.error('Erro ao buscar histórico de compras:', error);
      throw error;
    }
  }

  async findByUserIdAndCondicao(userId: string, condicaoId: string): Promise<HistoricoCompras[]> {
    try {
      return this.historicoComprasModel.find({ userId, condicaoId }).exec();
    } catch (error) {
      console.error('Erro ao buscar histórico de compras por usuário e condição:', error);
      throw error;
    }
  }

  async findByUserIdVooAndCondicao(userId: string, numVoo: string, condicaoId: string): Promise<HistoricoCompras[]> {
    try {
      return this.historicoComprasModel.find({ userId, numVoo, condicaoId }).exec();
    } catch (error) {
      console.error('Erro ao buscar histórico de compras por usuário, número do voo e condição:', error);
      throw error;
    }
  }

  async updateRegistro(id: string, registroAtualizado: any): Promise<HistoricoCompras> {
    return this.historicoComprasModel.findByIdAndUpdate(id, registroAtualizado, { new: true });
  }
}