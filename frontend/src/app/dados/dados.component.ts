import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importando FormsModule
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dados',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatButtonModule, HttpClientModule],
  templateUrl: './dados.component.html',
  styleUrl: './dados.component.css'
})

export class DadosComponent implements OnInit {
  userData: any = null;
  dados = {
    fullName: '',
    email: '',
    cpf: '',
  };
  errorMessage: string = '';

  private apiUrl = 'http://localhost:4200';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    const userEmail = localStorage.getItem('userEmail');

    console.log('DadosComponent inicializado');
    console.log("Email do usuário logado:", userEmail);

    if (userEmail) {
      try {
        const response = await fetch(`http://localhost:4200/users/${userEmail}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar usuário');
        }
        this.userData = await response.json();
        console.log('Dados do usuário:', this.userData);

      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }
  }

  async onSubmit() {
    console.log('=== ALTERACAO DOS DADOS DO USUARIO ===');
    console.log(`Nome Completo: ${this.userData.fullName}`);
    console.log(`Email: ${this.userData.email}`);
    console.log(`Senha: ${this.userData.password}`);
    console.log('========================');

    // previne erro de login
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.log("Usuário não identificado");
      this.errorMessage = 'Usuário não identificado';
      return;
    }

    const dadosAlteracao = {
      fullName: this.userData.fullName,
      email: this.userData.email,
      password: this.userData.password
    };

    // manda pro banco - sem validacao de cpf em java
    this.http.patch(`${this.apiUrl}/dados/atualizar`, dadosAlteracao)
      .subscribe({
        next: (response: any) => {
          console.log('Dados de usuário atualizados com sucesso:', response);
          this.router.navigate(['/menu']);
        },
        error: (error) => {
          console.error('Erro ao atualizar dados de usuário:', error);
          this.errorMessage = 'Erro ao processar dados de usuário. Tente novamente.';
        }
      });














  }








}

