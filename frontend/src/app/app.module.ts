import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule } from '@angular/router'; // Importa o RouterModule
import { AppRoutingModule, routes } from './app.routes'; // Importe as rotas

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { AlugarComponent } from './alugar/alugar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    MenuComponent,
    PagamentoComponent,
    ConfiguracoesComponent,
    AlugarComponent,
    HomepageComponent,
    ErrorpageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule, // Adicione esta linha
    FormsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
