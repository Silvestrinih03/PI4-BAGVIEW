import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class HistoricoCompras extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: String, default: null })
  numVoo: String | null;

  @Prop({ type: Date, default: () => new Date() })
  data: Date;
  
  @Prop({ required: true })
  condicaoId: string;
}

export const HistoricoComprasSchema = SchemaFactory.createForClass(HistoricoCompras);