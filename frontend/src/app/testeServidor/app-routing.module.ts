import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';  // Importando o seu componente principal

const routes: Routes = [
  { path: 'testeServidorJava', component: AppComponent }  // Definindo que o caminho /testeServidorJava deve carregar o AppComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Registrando as rotas
  exports: [RouterModule]  // Tornando as rotas acessíveis
})
export class AppRoutingModule {}
