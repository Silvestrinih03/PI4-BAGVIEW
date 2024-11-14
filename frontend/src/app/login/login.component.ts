import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

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

  /**
   * Método chamado ao submeter o formulário de login.
   * Realiza a autenticação do usuário e redireciona para o menu principal em caso de sucesso.
   */
  onSubmit() {
    // Reseta a mensagem de erro antes de tentar logar
    this.errorMessage = '';

    this.authService.login(this.email, this.senha).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido:', response);
        // Armazena os dados do usuário no serviço de autenticação
        this.authService.setUserData(response.user);
        // Armazena o email do usuário no localStorage
        localStorage.setItem('userEmail', this.email);
        console.log(
          'Email do usuário logado:',
          localStorage.getItem('userEmail')
        );
        // Redireciona para a página de menu
        this.router.navigate(['menu']);
      },
      error: (error) => {
        console.error('Erro no login:', error);
        // Define a mensagem de erro a ser exibida
        this.errorMessage = 'Email ou senha incorretos';
      },
    });
  }
}
