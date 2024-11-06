import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VoosDocument = Voos & Document;

@Schema({ collection: 'flights' })
export class Voos extends Document {

  @Prop({ required: true, unique: true })
  numVoo: string;

  @Prop({ required: true })
  origem: string;

  @Prop({ required: true})
  destino: string;
}

export const VoosSchema = SchemaFactory.createForClass(Voos);
