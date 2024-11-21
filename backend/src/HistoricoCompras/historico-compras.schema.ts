import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class HistoricoCompras extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: String, default: null })
  origem: String | null;

  @Prop({ type: String, default: null })
  destino: String | null;
  
  @Prop({ type: Date, default: null })
  data: Date | null;
  
  @Prop({ required: true })
  condicaoId: string;
}

export const HistoricoComprasSchema = SchemaFactory.createForClass(HistoricoCompras);