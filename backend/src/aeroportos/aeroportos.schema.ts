import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define o esquema para a coleção Aeroportos no MongoDB
@Schema()
export class Aeroportos extends Document {
  // Propriedade obrigatória que representa a sigla do aeroporto
  @Prop({ required: true })
  sigla: string;

  // Propriedade obrigatória que representa o nome do aeroporto
  @Prop({ required: true })
  nome: String;

  // Propriedade obrigatória que representa a cidade onde o aeroporto está localizado
  @Prop({ required: true })
  cidade: String;

  // Propriedade obrigatória que representa a latitude do aeroporto
  @Prop({ required: true, type: Number })
  latitude: number;

  // Propriedade obrigatória que representa a longitude do aeroporto
  @Prop({ required: true, type: Number })
  longitude: number;
}

// Cria o esquema Mongoose para a classe Aeroportos
export const AeroportosSchema = SchemaFactory.createForClass(Aeroportos);
