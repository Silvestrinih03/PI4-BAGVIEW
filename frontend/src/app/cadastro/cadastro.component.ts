import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CadastroClientService } from '../services/cadastro-client.service';
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

  private apiValidacao = 'http://localhost:5000';

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

  async onSubmit() {
    if (!this.arePasswordsMatching()) {
      this.displayError('As senhas não coincidem.');
      return;
    }

    const isValidCpf = await this.validateWithSocket('cpf', this.usuario.cpf);
    if (!isValidCpf) {
      this.displayError('CPF inválido');
      return;
    }

    const isValidSenha = await this.validateWithSocket('senha', this.usuario.password);
    if (!isValidSenha) {
      this.displayError('A senha deve conter pelo menos: 1 caractere maiúsculo, 1 caractere minúsculo, 1 número, 1 caractere especial e ter no mínimo 8 caracteres.');
      return;
    }


    this.logSignupDetails();

    try {
      const response = await this.registerUser();
      this.onSuccessfulRegistration(response);
    } catch (error) {
      this.handleRegistrationError(error);
    }
  }

  private arePasswordsMatching(): boolean {
    return this.usuario.password === this.confirmaSenha;
  }

  private displayError(message: string) {
    this.errorMessage = message;
  }

  private logSignupDetails() {
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
  }

  private async registerUser(): Promise<any> {
    return this.cadastroService.cadastrarUsuario(this.usuario).toPromise();
  }

  private onSuccessfulRegistration(response: any) {
    console.log('Cadastro realizado com sucesso:', response);

    // Armazena o email do usuário para futuras referências
    localStorage.setItem('userEmail', this.usuario.email);

    // Redireciona com base no plano selecionado
    const route = this.usuario.idPlan === '6716a54052a0be5933feebc4' ? '/pagamento' : '/menu';
    this.router.navigate([route]);
  }

  private handleRegistrationError(error: any) {
    console.error('Erro no cadastro:', error);
    this.displayError('Erro ao realizar cadastro. Tente novamente.');
  }

  private async validateWithSocket(validationType: string, value: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiValidacao}/validar`, { tipoValidacao: validationType, valor: value })
        .subscribe({
          next: (response: any) => {
            console.log('Resposta do servidor:', response);
            resolve(response.valido === true);
          },
          error: (err) => {
            console.error('Erro ao conectar ao servidor:', err.message);
            reject(false);
          }
        });
    });
  }
}