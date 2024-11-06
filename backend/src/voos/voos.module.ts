import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VoosService } from './voos.service';
import { VoosController } from './voos.controller';
import { Voos, VoosSchema } from './voos.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Voos.name, schema: VoosSchema }])],
  providers: [VoosService],
  controllers: [VoosController],
  exports: [VoosService],
})
export class VoosModule {}