import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CadastroModule } from './cadastro/cadastro.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { VoosModule } from './voos/voos.module';
import { DadosModule } from './dados/dados.module';
import { AlugarModule } from './alugar/alugar.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://bagview:bagview2024@bagtrackingcluster.dcmh6.mongodb.net/tagRental?retryWrites=true&w=majority&appName=bagTrackingCluster'), // Ajuste a URL conforme necessário
    UsersModule,
    AuthModule,
    CadastroModule,
    PagamentoModule,
    VoosModule,
    DadosModule,
    AlugarModule,
    TagsModule
  ],
  providers: [],
})
export class AppModule {}
