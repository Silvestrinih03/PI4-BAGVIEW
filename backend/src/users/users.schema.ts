import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop({ required: true})
  idPlan: string;

  @Prop({
    type: [
      {
        num: { type: String, required: true },
        nome: { type: String, required: true },
        val: { type: String, required: true },
      }
    ],
    required: true
  })
  card: {
    num: string;
    nome: string;
    val: string;
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
