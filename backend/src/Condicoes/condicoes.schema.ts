import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CondicoesDocument = Condicoes & Document;

@Schema({ collection: 'condicoes' })
export class Condicoes extends Document {

  @Prop({ required: true, unique: true })
  descricao: string;
}

export const CondicoesSchema = SchemaFactory.createForClass(Condicoes);
