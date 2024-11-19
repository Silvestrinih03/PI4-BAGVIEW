import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthClientService } from '../services/auth-client.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-possui',
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
  templateUrl: './possui.component.html',
  styleUrl: './possui.component.css'
})

export class PossuiComponent implements OnInit {
  userData: any = null;
  planoName: string = '';
  preco: string = '';
  planoDoUsuario: string = '';
  userEmail: string = '';
  qtdTagsNumber: number = 0;
  errorMessage: string = '';

  private apiUrl = 'http://localhost:4200'; // URL do servidor NestJS

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    // Inicio do componente
    console.log('============================');
    console.log('PossuiComponent inicializado');
    
    // Verifica se o usuário está logado e puxa do banco os dados do usuário
    const userEmail = localStorage.getItem('userEmail');
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

    // Console do email do usuário logado
    console.log("Email do usuário logado:", userEmail);
    
    // Atribuindo o plano do usuário à propriedade da classe
    this.planoDoUsuario = this.userData?.idPlan || ''; // Atribuindo corretamente
    console.log("Plano do usuário:", this.planoDoUsuario);

    // PARTE TAGS  
    const qtdTags = localStorage.getItem('quantidadeTags');
    const qtdTagsNumber = qtdTags ? parseFloat(qtdTags) : 0;
    console.log("Qtd de tags que deseja alugar:", qtdTagsNumber);

    // CALCULO DO PRECO A SER EXIBIDO
    // QTD TAGS X VALOR DO PLANO

    // IF (=5) -> USUÁRIO TEMPORÁRIO
    if (this.planoDoUsuario === '6716a54052a0be5933feebc5') {
      console.log("Plano do usuário é temporário");
      const qtdDias = localStorage.getItem('quantidadeDias');
      const qtdDiasNumber = qtdDias ? parseInt(qtdDias) : 0;
      this.preco = (qtdDiasNumber * qtdTagsNumber * 11.90).toFixed(2);
      console.log("Preco a ser exibido (Temporario):", this.preco);
    }

    // IF (=4) -> USUÁRIO MENSAL
    if (this.planoDoUsuario === '6716a54052a0be5933feebc4') {
      console.log("Plano do usuário é mensal");
      this.preco = (85.90 * qtdTagsNumber).toFixed(2); 
      console.log("Preco a ser exibido (Mensal):", this.preco);
    }



    console.log("Qts tags possui atualmente:", this.userData.inactiveTags);
  }


  onSubmit() {
    console.log("Submetendo dados: ");
    
    // Atribuindo o email do usuário
    this.userEmail = this.userData?.email || ''; // Certifique-se de que o email está sendo atribuído corretamente

    console.log("Email:", this.userEmail);
    
    // Lê a quantidade de tags do localStorage
    var qtdTags = localStorage.getItem('quantidadeTags');
    this.qtdTagsNumber = qtdTags ? parseInt(qtdTags) : 0; // Certifique-se de que a quantidade de tags está sendo lida corretamente

    console.log("Qts tags possui atualmente:", this.userData.inactiveTags);
    const qtdTagsAtual = parseInt(this.userData.inactiveTags, 10);

    this.qtdTagsNumber += qtdTagsAtual; // Soma a quantidade atual de tags

    console.log("Quantidade total de tags:", this.qtdTagsNumber);
    
    const dados = {
      email: this.userEmail,
      inactiveTags: this.qtdTagsNumber // Use a quantidade de tags lida do localStorage
    };

    // API
    this.http.patch(`${this.apiUrl}/alugar/alugarTag`, dados)
      .subscribe({
        next: (response: any) => {
          console.log('Tag alugada com sucesso:', response);
          this.router.navigate(['/concluido']);
        },
        error: (error) => {
          console.error('Erro ao alugar tag:', error);
          this.errorMessage = 'Erro ao alugar tag. Tente novamente.';
        }
      });
  }


}