import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CadastroModule } from './cadastro/cadastro.module';
import { PagamentoService } from './pagamento/pagamento.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://bagview:bagview2024@bagtrackingcluster.dcmh6.mongodb.net/tagRental?retryWrites=true&w=majority&appName=bagTrackingCluster'), // Ajuste a URL conforme necessário
    UsersModule,
    AuthModule,
    CadastroModule,
  ],
  providers: [PagamentoService],
})
export class AppModule {}
