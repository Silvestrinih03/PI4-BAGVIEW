import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tags, TagsDocument } from './tags.schema';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tags.name) private tagsModel: Model<TagsDocument>) {}

  async findAll(): Promise<Tags[]> {
    console.log('Buscando todas as tags');
    try {
      const tags = await this.tagsModel.find().exec();
      console.log('Tags encontradas:', JSON.stringify(tags, null, 2));
      return tags;
    } catch (error) {
      console.error('Erro ao buscar tags:', error);
      throw error;
    }
  }

  // Método para buscar tags filtradas por JSON
  async findByFilters(filters: Record<string, any>): Promise<Tags[]> {
    console.log(`Buscando tags com filtros: ${JSON.stringify(filters)}`);

    // Conversão do campo 'local' para ObjectId, se necessário
    if (filters.local) {
      filters.local = new Types.ObjectId(filters.local);
    }

    try {
      const tags = await this.tagsModel.find(filters).exec();
      if (tags.length === 0) {
        throw new NotFoundException('Nenhuma tag encontrada com os parâmetros fornecidos');
      }
      console.log('Tags encontradas:', JSON.stringify(tags, null, 2));
      return tags;
    } catch (error) {
      console.error('Erro ao buscar tags:', error);
      throw error;
    }
  }

  // Método para atualizar o status de uma tag
  async updateStatus(idTag: string[], status: boolean): Promise<void> {
    await this.tagsModel.updateMany({ _id: { $in: idTag } }, { $set: { status: status } }).exec();
    console.log(`Status das tags ${idTag} atualizado para ${status}`);
  }

  // Método para atualizar o local de uma tag
  async updateLocal(idTag: string[], local: string): Promise<any> {
    try {
      const idTagsObjectId = idTag.map((id) => new Types.ObjectId(id));
      const localObjectId = new Types.ObjectId(local);
  
      console.log('IDs das Tags:', idTagsObjectId);
      console.log('Novo Local:', localObjectId);
  
      const result = await this.tagsModel.collection.updateMany(
        { _id: { $in: idTagsObjectId } },
        { $set: { local: localObjectId } }
      );
  
      console.log('Resultado da atualização:', {
        documentosEncontrados: result.matchedCount,
        documentosModificados: result.modifiedCount,
        operacaoReconhecida: result.acknowledged,
        detalhes: result
      });

      if (result.matchedCount === 0) {
        console.warn('Nenhuma tag encontrada para atualização');
      } else {
        console.log(`${result.modifiedCount} tags atualizadas com sucesso`);
      }

      return result;
    } catch (error) {
      console.error('Erro ao atualizar local das tags:', error);
      throw error;
    }
  }
  
}