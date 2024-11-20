import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class HistoricoCompras extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: Date, default: null })
  retirada: Date | null;
  
  @Prop({ type: Date, default: null })
  devolucao: Date | null;
  
  @Prop({ required: true })
  condicaoId: string;
}

export const HistoricoComprasSchema = SchemaFactory.createForClass(HistoricoCompras);