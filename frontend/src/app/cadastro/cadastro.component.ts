import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthClientService } from '../services/auth-client.service';
import { CadastroClientService } from '../services/cadastro-client.service';
import { provideHttpClient } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import { MatRadioModule } from '@angular/material/radio';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatSlideToggleModule,
    MatRadioModule,
  ],
  providers: [CadastroClientService],
})
export class CadastroComponent {
  // Dados do usuário
  usuario = {
    fullName: '',
    email: '',
    password: '',
    cpf: '',
    idPlan: '',
    card: [
      {
        num: '',
        nome: '',
        val: '',
      },
    ],
    idFlights: [
      {
        objectId: '',
      },
    ],
    userTags: [
      {
        objectId: '',
      },
    ],
    inactiveTags: 0,
  };

  confirmaSenha: string = ''; // Armazena a confirmação da senha
  errorMessage: string = ''; // Mensagem de erro
  hide: boolean = true; // Controle de visibilidade da senha

  constructor(
    private router: Router,
    private cadastroService: CadastroClientService,
    private http: HttpClient
  ) {}

  // Alterna a visibilidade da senha
  clickEvent(event: MouseEvent) {
    event.preventDefault();
    this.hide = !this.hide;
  }

  // Atualiza o plano selecionado
  onPlanoChange(event: MatRadioChange) {
    this.usuario.idPlan = event.value;
  }

  // Envio dos dados do cadastro
  async onSubmit() {
    try {
      // Verifica se as senhas coincidem
      if (this.usuario.password !== this.confirmaSenha) {
        this.errorMessage = 'As senhas não coincidem';
        return;
      }
      
      // Log dos detalhes do cadastro
      console.log('=== Detalhes do Cadastro ===');
      console.log(
        `Plano selecionado: ${
          this.usuario.idPlan === '6716a54052a0be5933feebc4'
            ? 'Plano Mensal'
            : 'Plano Temporário'
        }`
      );
      localStorage.setItem('plano', this.usuario.idPlan);
      console.log('Plano do usuário:', this.usuario.idPlan);

      // Chamada ao serviço para cadastrar o usuário
      const response = await this.cadastroService
        .cadastrarUsuario(this.usuario)
        .toPromise();
      console.log('Cadastro realizado com sucesso:', response);

      // Armazena o email do usuário e redireciona
      localStorage.setItem('userEmail', this.usuario.email);
      if (this.usuario.idPlan === '6716a54052a0be5933feebc4') {
        await this.router.navigate(['/pagamento']);
      } else {
        await this.router.navigate(['/menu']);
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      this.errorMessage = 'Erro ao realizar cadastro. Tente novamente.';
    }
  }
}
