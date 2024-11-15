import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop()
  idPlan: string;

  @Prop({
    type: [
      {
        num: { type: String},
        nome: { type: String},
        val: { type: String,},
      }
    ],
    required: false
  })
  card: {
    num: string;
    nome: string;
    val: string;
  }[];


@Prop({
  type: [{
    objectId: { type: String }
  }]
})
idFlights: {
  objectId: string;
}[];

@Prop({
  type: [{
    objectId: { type: String }
  }]
})
userTags: {
  objectId: string;
}[];

@Prop()
  inactiveTags: number;

}



export const UserSchema = SchemaFactory.createForClass(User);
