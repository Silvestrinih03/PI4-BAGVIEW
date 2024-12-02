import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Aeroportos, AeroportosSchema } from './aeroportos.schema';
import { AeroportosService } from './aeroportos.service';
import { AeroportosController } from './aeroportos.controller';

// Define um módulo do NestJS
@Module({
  // Importa o módulo do Mongoose com o esquema Aeroportos
  imports: [
    MongooseModule.forFeature([
      { name: Aeroportos.name, schema: AeroportosSchema },
    ]),
  ],
  // Define o controlador para o módulo
  controllers: [AeroportosController],
  // Define os provedores de serviços para o módulo
  providers: [AeroportosService],
  // Exporta o serviço para que possa ser usado em outros módulos
  exports: [AeroportosService],
})
// Declaração da classe do módulo Aeroportos
export class AeroportosModule {}
