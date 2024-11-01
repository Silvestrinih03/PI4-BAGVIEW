import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AuthClientService } from '../services/auth-client.service';
import { CadastroClientService } from '../services/cadastro-client.service';
import { provideHttpClient } from '@angular/common/http';  // Adicione este import


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true,
  imports: [FormsModule, 
    CommonModule,
    HttpClientModule,  // Adicionando HttpClientModule
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
    providers: [
      CadastroClientService
    ]
})
export class CadastroComponent {
  usuario = {
    fullName: '',
    email: '',
    password: '',
    cpf: '',
    idPlan: '',
    card: [
      {
      num: "",
      nome: "",
      val: ""
    }
  ],
  idFlights: [
    {
      objectId: ""
    }
  ],
  userTags: [
    {
      objectId: ""
    }
  ]
  };
  
  confirmaSenha: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private cadastroService: CadastroClientService
  ) {}

  onSubmit() {
    if (this.usuario.password !== this.confirmaSenha) {
      this.errorMessage = 'As senhas não coincidem';
      return;
    }
    else{
      this.cadastroService.cadastrarUsuario(this.usuario).subscribe({
        next: (response) => {
          console.log('Cadastro realizado com sucesso:', response);
          localStorage.setItem('userEmail', this.usuario.email);
          this.router.navigate(['/menu']);
        },
        error: (error) => {
          console.error('Erro no cadastro:', error);
          this.errorMessage = 'Erro ao realizar cadastro. Tente novamente.';
        }
      });

      console.log('Usuário a ser cadastrado:', this.usuario);
    
      localStorage.setItem('userEmail', this.usuario.email);
    
      this.router.navigate(['/menu']);
    }
  }
}