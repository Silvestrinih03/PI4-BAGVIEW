import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alterar-senha',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;
  showModalSucesso: boolean = false;
  userData: any = null;

  private apiValidacao = 'http://localhost:5000';

  constructor(private router: Router, private http: HttpClient) {}

  async ngOnInit() {
    await this.carregarUsuario();
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

  async onSubmit() {
    // Verificar se a senha antiga fornecida é igual à senha do usuário
    if (this.oldPassword !== this.userData?.password) {
      this.errorMessage = 'A senha antiga está incorreta.';
      return;
    }

    // Verificar se a nova senha é igual à confirmação de senha
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    const isValidSenha = await this.validateWithSocket('senha', this.newPassword);
    if (!isValidSenha) {
      this.errorMessage = 'A senha deve conter pelo menos: 1 caractere maiúsculo, 1 caractere minúsculo, 1 número, 1 caractere especial e ter no mínimo 8 caracteres.';
      return;
    }

    // Chamar a rota do backend para atualizar a senha no banco de dados
    if (this.oldPassword && this.newPassword) {
      this.errorMessage = null;
      this.atualizarSenha();
    } else {
      this.errorMessage = 'Preencha todos os campos corretamente.';
    }
  }

  // Função para atualizar a senha no banco de dados
  private atualizarSenha() {
    if (!this.userData || !this.newPassword) return;
    const body = { email: this.userData.email, novaSenha: this.newPassword };
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail || !this.newPassword) return;
    this.http.put('http://localhost:4200/dados/alterar-senha', body).pipe(
      catchError((error) => {
        this.errorMessage = 'Erro ao atualizar a senha. Tente novamente.';
        console.error(error);
        throw error;
      })
    ).subscribe((response) => {
      this.showModalSucesso = true;
    });
  }

  closeModal() {
    this.showModalSucesso = false;
    this.router.navigate(['/configuracoes']);
  }
}