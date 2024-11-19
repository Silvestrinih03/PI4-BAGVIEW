import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

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
  voos: any[] = []; // Lista de voos
  numVoo: string = ''; // Número do voo selecionado
  quantidadeTags: number = 1; // Quantidade de tags
  quantidadeDias: number = 1; // Quantidade de dias
  planoDoUsuario: string = ''; // Plano do usuário
  userData: any = null; // Dados do usuário
  userCardNumber: string = ''; // Número do cartão do usuário

  constructor(private router: Router) {}

  async ngOnInit() {
    console.log("===============================");
    console.log('AlugarComponent inicializado');

    const userEmail = localStorage.getItem('userEmail');
    console.log("Email do usuário:", userEmail);

    // Carregar a lista de voos (substitua a URL com a do seu backend)
    try {
      const response = await fetch('http://localhost:4200/api/voos'); // Supondo que sua API de voos esteja nessa URL
      if (!response.ok) {
        throw new Error('Erro ao buscar voos');
      }
      this.voos = await response.json();
      console.log('Lista de voos:', this.voos);
    } catch (error) {
      console.error('Erro ao buscar voos:', error);
    }

    if (userEmail) {
      try {
        const response = await fetch(`http://localhost:4200/users/${userEmail}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar usuário');
        }
        this.userData = await response.json();
        console.log('Dados do usuário:', this.userData);

        if (this.userData?.card && this.userData.card.length > 0) {
          this.userCardNumber = this.userData.card[0].num;
          localStorage.setItem('userCard', this.userData.card[0].num);
        } else {
          console.log("Usuário não possui cartão cadastrado");
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }

    this.planoDoUsuario = this.userData?.idPlan || ''; 
    console.log("Plano do usuário:", this.planoDoUsuario);
  }

  onSubmit() {
    console.log("Quantidade de Tags:", this.quantidadeTags);
    localStorage.setItem('quantidadeTags', this.quantidadeTags.toString());

    console.log("Quantidade de dias:", this.quantidadeDias);
    localStorage.setItem('quantidadeDias', this.quantidadeDias.toString());

    const userCard = localStorage.getItem('userCard');
    console.log("Cartão do usuário:", userCard);

    if (!this.userCardNumber) {
      this.router.navigate(['/pagamento']);
    } else {
      this.router.navigate(['/possui']);
    }
  }
}