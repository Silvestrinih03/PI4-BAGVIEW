import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Aeroportos, AeroportosSchema } from './aeroportos.schema';
import { AeroportosService } from './aeroportos.service';
import { AeroportosController } from './aeroportos.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Aeroportos.name, schema: AeroportosSchema }]),
  ],
  controllers: [AeroportosController],
  providers: [AeroportosService],
  exports: [AeroportosService],
})
export class AeroportosModule {}