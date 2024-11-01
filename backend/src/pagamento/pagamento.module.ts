import { Module } from '@nestjs/common';
import { PagamentoController } from './pagamento.controller';
import { PagamentoService } from './pagamento.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [PagamentoController],
  providers: [PagamentoService],
})
export class PagamentoModule {}
