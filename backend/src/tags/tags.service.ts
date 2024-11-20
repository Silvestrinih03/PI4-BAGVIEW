import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

}