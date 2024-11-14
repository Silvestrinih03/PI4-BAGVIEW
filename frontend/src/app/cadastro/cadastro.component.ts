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
  };

  confirmaSenha: string = ''; // Armazena a confirmação da senha
  errorMessage: string = ''; // Mensagem de erro
  hide: boolean = true; // Controle de visibilidade da senha

  // URLs da API Java
  private javaApiUrl = 'http://localhost:8080/validar-senha';
  private javaApiUrlCpf = 'http://localhost:8080/validarcpf';

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

  // Validação da senha com chamada ao servidor Java
  async validarSenha(): Promise<boolean> {
    try {
      const urlComSenha = `${this.javaApiUrl}?senha=${this.usuario.password}`;
      const isValid = await firstValueFrom(
        this.http.post<boolean>(urlComSenha, {})
      );
      if (!isValid) {
        this.errorMessage =
          'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial (@, !, *, & etc).';
      } else {
        this.errorMessage = ''; // Limpa a mensagem de erro se a senha for válida
      }
      return isValid;
    } catch (error) {
      this.errorMessage = 'Erro ao validar a senha. Tente novamente.';
      console.error('Erro de validação de senha:', error);
      return false;
    }
  }

  // Validação do CPF com chamada ao servidor Java
  async validarCpf(): Promise<boolean> {
    try {
      const urlComCPF = `${this.javaApiUrlCpf}?cpf=${this.usuario.cpf}`;
      const isValid = await firstValueFrom(
        this.http.post<boolean>(urlComCPF, {})
      );
      if (!isValid) {
        this.errorMessage = 'CPF inválido!';
      } else {
        this.errorMessage = ''; // Limpa a mensagem de erro se o CPF for válido
      }
      return isValid;
    } catch (error) {
      this.errorMessage = 'Erro ao validar o CPF. Tente novamente.';
      console.error('Erro de validação de CPF:', error);
      return false;
    }
  }

  // Envio dos dados do cadastro
  async onSubmit() {
    try {
      // Verifica se as senhas coincidem
      if (this.usuario.password !== this.confirmaSenha) {
        this.errorMessage = 'As senhas não coincidem';
        return;
      }

      // Validação da senha antes de enviar
      const isValidPassword = await this.validarSenha();
      if (!isValidPassword) {
        console.log('Senha inválida.');
        return; // Não enviar os dados para o servidor se a senha for inválida
      }

      // Validação do CPF antes de enviar
      const isValidCpf = await this.validarCpf();
      if (!isValidCpf) {
        console.log('CPF inválido.');
        return; // Não enviar os dados para o servidor se o CPF for inválido
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
