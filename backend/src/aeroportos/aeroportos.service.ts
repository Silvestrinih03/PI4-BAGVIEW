import { Injectable } from '@nestjs/common';
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
}