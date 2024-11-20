import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoricoCompras, HistoricoComprasSchema } from './historico-compras.schema';
import { HistoricoComprasService } from './historico-compras.service';
import { HistoricoComprasController } from './historico-compras.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HistoricoCompras.name, schema: HistoricoComprasSchema }]),
  ],
  controllers: [HistoricoComprasController],
  providers: [HistoricoComprasService],
  exports: [HistoricoComprasService],
})
export class HistoricoComprasModule {}