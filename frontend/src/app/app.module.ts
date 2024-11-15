import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Módulos do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

// Módulos de Formulários e Roteamento
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routes } from './app.routes';

// Componentes da Aplicação
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MenuComponent } from './menu/menu.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { AlugarComponent } from './alugar/alugar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { ConcluidoComponent } from './concluido/concluido.component';
import { MensalComponent } from './mensal/mensal.component';
import { CartaoComponent } from './cartao/cartao.component';

// Serviços HTTP (comentado por enquanto)
// import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

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
    ConcluidoComponent,
    MensalComponent,
    CartaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // Módulos do Angular Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,

    // Módulos de Funcionalidade
    FormsModule,

    // Configuração de Roteamento
    RouterModule.forRoot(routes),
    AppRoutingModule,
  ],
  providers: [
    // Serviços HTTP (descomentar quando necessário)
    // provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
