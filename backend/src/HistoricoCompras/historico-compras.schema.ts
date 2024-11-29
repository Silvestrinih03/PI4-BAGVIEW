import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class HistoricoCompras extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  numVoo: string;

  @Prop({ required : true, type: Date, default: () => new Date() })
  data: Date;

  @Prop({ required: true, type: Number })
  qtdTags: number;
  
  @Prop({ required: true })
  condicaoId: string;
}

export const HistoricoComprasSchema = SchemaFactory.createForClass(HistoricoCompras);