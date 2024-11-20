import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagsDocument = Tags & Document;

@Schema({ collection: 'tags' })
export class Tags extends Document {

  @Prop({ required: true })
  status: boolean;

  @Prop({ required: true})
  localizacao: string;
}

export const TagsSchema = SchemaFactory.createForClass(Tags);
