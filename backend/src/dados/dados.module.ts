import { Module } from '@nestjs/common';
import { DadosController } from './dados.controller';
import { DadosService } from './dados.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [DadosController],
  providers: [DadosService],
})
export class DadosModule {}
