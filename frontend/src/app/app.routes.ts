import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { AlugarComponent } from './alugar/alugar.component';



export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'login', component: LoginComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'pagamento', component: PagamentoComponent },
    { path: 'configuracoes', component: ConfiguracoesComponent },
    { path: 'alugar', component: AlugarComponent}
  ];

  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }