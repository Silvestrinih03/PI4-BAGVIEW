import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'login', component: LoginComponent } // Rota para o componente de cadastro
  ];

  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }