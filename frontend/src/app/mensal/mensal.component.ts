import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthClientService } from '../services/auth-client.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mensal',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    RouterModule],
  templateUrl: './mensal.component.html',
  styleUrl: './mensal.component.css'
})
export class MensalComponent {
  userData: any = null;
  planoName: string = '';

  constructor(private router: Router) {}

  async ngOnInit() {
    const userEmail = localStorage.getItem('userEmail');
    console.log('ConfiguracoesComponent inicializado');
    console.log("Email do usuário logado:", userEmail);

    if (userEmail) {
      try {
        const response = await fetch(`http://localhost:4200/users/${userEmail}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar usuário');
        }
        this.userData = await response.json();
        console.log('Dados do usuário:', this.userData);
        
        // Verifica se existe card e se é um array com elementos
        if (this.userData?.card && this.userData.card.length > 0) {
          console.log("Cartão do usuário:", this.userData.card[0].num);
          localStorage.setItem('userCard', this.userData.card[0].num);
        } else {
          console.log("Usuário não possui cartão cadastrado");
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }
}
}
