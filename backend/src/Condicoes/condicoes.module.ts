import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Condicoes, CondicoesSchema } from './condicoes.schema';
import { CondicoesService } from './condicoes.service';
import { CondicoesController } from './condicoes.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Condicoes.name, schema: CondicoesSchema }])],
  providers: [CondicoesService],
  controllers: [CondicoesController],
  exports: [CondicoesService],
})
export class CondicoesModule {}