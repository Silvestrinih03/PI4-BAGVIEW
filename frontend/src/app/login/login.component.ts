import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

// Módulos do Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

// Serviços
import { AuthClientService } from '../services/auth-client.service';

/**
 * Componente responsável pelo formulário de login do usuário.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    // Importações do Angular Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  providers: [AuthClientService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  /** Armazena o email inserido pelo usuário */
  email: string = '';
  /** Armazena a senha inserida pelo usuário */
  senha: string = '';
  /** Mensagem de erro a ser exibida em caso de falha no login */
  errorMessage: string = '';
  /** Serviço de autenticação injetado */
  private authService = inject(AuthClientService);
  /** Serviço de roteamento injetado */
  private router = inject(Router);
  userData: any = null;

  hide: boolean = true; // Controle de visibilidade da senha

  clickEvent(event: MouseEvent) {
    event.preventDefault();
    this.hide = !this.hide;
  }

  /**
   * Método chamado ao submeter o formulário de login.
   * Realiza a autenticação do usuário e redireciona para o menu principal em caso de sucesso.
   */
  onSubmit() {
    // Reseta a mensagem de erro antes de tentar logar
    this.errorMessage = '';

    this.authService.login(this.email, this.senha).subscribe({
      next: async (response) => {
        console.log('Login bem-sucedido:', response);
        // Armazena os dados do usuário no serviço de autenticação
        this.authService.setUserData(response.user);
        // Armazena o email do usuário no localStorage
        localStorage.setItem('userEmail', this.email);
        console.log(
          'Email do usuário logado:',
          localStorage.getItem('userEmail')
        );

        await this.carregarUsuario();
        // Verifica se o plano é mensal e se não há cartão cadastrado
        if (
          this.userData.idPlan === '6716a54052a0be5933feebc4' &&
          !this.userData.card[0]?.num
        ) {
          console.log('Plano mensal sem cartão cadastrado');
          this.router.navigate(['/pagamento']);
        }
        // Redireciona para a página de menu
        else this.router.navigate(['menu']);
      },
      error: (error) => {
        console.error('Erro no login:', error);
        if (error?.response?.message) {
          this.errorMessage = error.response.message; // Exibe a mensagem do erro retornada pelo backend
        } else {
          this.errorMessage = 'Email ou senha incorretos'; // Mensagem padrão
        }
      },
    });
  }

  // Função para carregar informações do usuário
  private async carregarUsuario() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    try {
      const response = await fetch(`http://localhost:4200/users/${userEmail}`);
      if (!response.ok) throw new Error('Erro ao buscar dados do usuário');

      this.userData = await response.json();
      console.log('Dados do usuário carregados:', this.userData);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  }
}
