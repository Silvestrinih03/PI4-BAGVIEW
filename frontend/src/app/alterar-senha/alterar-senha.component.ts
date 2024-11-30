import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alterar-senha',
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

  constructor(private router: Router) {}

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

  onSubmit() {
    // Validação de senha
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    // Se a senha for alterada com sucesso
    if (this.oldPassword && this.newPassword) {
      this.errorMessage = null;
      this.showModalSucesso = true;
    } else {
      this.errorMessage = 'Preencha todos os campos corretamente.';
    }
  }

  closeModal() {
    this.showModalSucesso = false;
    // Redireciona para a página de configurações ou onde for necessário
    this.router.navigate(['/configuracoes']);
  }
}