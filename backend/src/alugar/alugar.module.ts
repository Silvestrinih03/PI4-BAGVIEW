import { Module } from '@nestjs/common';
import { AlugarController } from './alugar.controller';
import { AlugarService } from './alugar.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AlugarController],
  providers: [AlugarService],
})
export class AlugarModule {}
