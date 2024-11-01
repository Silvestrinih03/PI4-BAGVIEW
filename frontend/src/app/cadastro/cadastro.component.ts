import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Adicionar esta importação

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CadastroComponent {
  usuario = {
    cpf: '',
    nome: '',
    email: '',
    senha: ''
  };
  
  confirmaSenha: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.usuario.senha !== this.confirmaSenha) {
      this.errorMessage = 'As senhas não coincidem';
      return;
    }

    // Aqui você pode adicionar a lógica para salvar o usuário
    console.log('Usuário a ser cadastrado:', this.usuario);
    
    // Armazena o email no localStorage (como solicitado anteriormente)
    localStorage.setItem('userEmail', this.usuario.email);
    
    // Redireciona para a página de menu após o cadastro
    this.router.navigate(['/pagamento']);
  }
}