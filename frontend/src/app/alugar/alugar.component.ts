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
  selector: 'app-alugar-tag',
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
    RouterModule
  ],
  templateUrl: './alugar.component.html',
  styleUrls: ['./alugar.component.css'] 
})
export class AlugarComponent implements OnInit {
  numeroVoo: string = '';
  quantidadeTags: number = 1;
  userData: any = null;

  constructor(private router: Router) {}

  async ngOnInit() {
    console.log('AlugarComponent inicializado');
    if (this.quantidadeTags === null) {
      this.quantidadeTags = 1;
    }

    const planoDoUsuario = localStorage.getItem('plano');
    console.log("Plano do usuário:", planoDoUsuario);

    const userEmail = localStorage.getItem('userEmail');
    console.log("Email do usuário:", userEmail);
    
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

  onSubmit() {
    console.log("Numero do Voo:", this.numeroVoo);
    console.log("Quantidade de Tags:", this.quantidadeTags);
    
    localStorage.setItem('numeroVoo', this.numeroVoo);
    localStorage.setItem('quantidadeTags', this.quantidadeTags.toString());
    
    const planoDoUsuario = localStorage.getItem('plano');
    console.log("Plano do usuário:", planoDoUsuario);
    
    const userCard = localStorage.getItem('userCard');
    console.log("Cartão do usuário:", userCard);
    
    // verificar se o cartao do usuário é vazio
    // se sim, redirecionar para a pagina de cadastro de cartao
    // se não, redirecionar para a pagina de 'mensal'
    if (userCard === '') {
      this.router.navigate(['/pagamento']);
    } else {
      this.router.navigate(['/mensal']);
    }
    

    
  }
}

