import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importação dos componentes de rota
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { AlugarComponent } from './alugar/alugar.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { ServicosComponent } from './servicos/servicos.component';
import { ContatoComponent } from './contato/contato.component';
import { DadosComponent } from './dados/dados.component';
import { HistoricoComprasComponent } from './historicoCompras/historico-compras.component';

// Definição das rotas da aplicação
export const routes: Routes = [
  // Rota padrão redireciona para a homepage
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },

  // Rotas principais da aplicação
  { path: 'homepage', component: HomepageComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'pagamento', component: PagamentoComponent },
  { path: 'configuracoes', component: ConfiguracoesComponent },
  { path: 'alugar', component: AlugarComponent },
  { path: 'sobre-nos', component: SobreNosComponent },
  { path: 'servicos', component: ServicosComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'dados', component: DadosComponent },
  { path: 'historico-compras', component: HistoricoComprasComponent},
  // Rota para páginas não encontradas
  { path: '**', redirectTo: '/errorpage' },
];

// Módulo de roteamento da aplicação
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
