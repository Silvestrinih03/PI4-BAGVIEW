import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Aeroportos extends Document {
  @Prop({ required: true })
  sigla: string;

  @Prop({ required: true })
  nome: String;

  @Prop({ required: true })
  cidade: String;

  @Prop({ required: true, type: Number })
  latitude: number;

  @Prop({ required: true, type: Number })
  longitude: number;
}

export const AeroportosSchema = SchemaFactory.createForClass(Aeroportos);