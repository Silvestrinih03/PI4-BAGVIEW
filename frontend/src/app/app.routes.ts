import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { AlugarComponent } from './alugar/alugar.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';

export const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'pagamento', component: PagamentoComponent },
  { path: 'configuracoes', component: ConfiguracoesComponent },
  { path: 'alugar', component: AlugarComponent },
  { path: 'errorpage', component: ErrorpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
