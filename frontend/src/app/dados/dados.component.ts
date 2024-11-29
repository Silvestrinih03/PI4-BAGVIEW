import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importando FormsModule
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dados',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatButtonModule, HttpClientModule],
  templateUrl: './dados.component.html',
  styleUrl: './dados.component.css'
})

export class DadosComponent implements OnInit {
  userData: any = null;
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
        this.userData = await this.fetchUserData(userEmail);
        console.log('Dados do usuário:', this.userData);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        this.errorMessage = 'Erro ao buscar os dados do usuário. Tente novamente.';
      }
    }
  }

  // Busca dados do usuário do backend
  private fetchUserData(userEmail: string): Promise<any> {
    return this.http.get(`${this.apiUrl}/users/${userEmail}`).toPromise();
  }

  onSubmit(): void {
    console.log('ALTERACAO DOS DADOS DO USUARIO');
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
      plan: this.userData.idPlan
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