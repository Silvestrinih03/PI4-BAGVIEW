import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CondicoesDocument = Condicoes & Document;

@Schema({ collection: 'condicoes' })
export class Condicoes extends Document {

  @Prop({ required: true, type: Types.ObjectId })  // Altere para ObjectId
  _id: Types.ObjectId; // Use ObjectId aqui
  
  @Prop({ required: true, unique: true })
  descricao: string;
}

export const CondicoesSchema = SchemaFactory.createForClass(Condicoes);
