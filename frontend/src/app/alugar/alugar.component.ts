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
  quantidadeTags: number = 1;
  userData: any = null;
  quantidadeDias: number = 1;
  planoDoUsuario: string = '';
  userCardNumber: string = '';

  constructor(private router: Router) {}

  async ngOnInit() {
    console.log("===============================");
    console.log('AlugarComponent inicializado');
    

    

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
          this.userCardNumber = this.userData.card[0].num;
          localStorage.setItem('userCard', this.userData.card[0].num);
        } else {
          console.log("Usuário não possui cartão cadastrado");
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }

    // Atribuindo o plano do usuário à propriedade da classe
    this.planoDoUsuario = this.userData?.idPlan || ''; // Atribuindo corretamente
    console.log("Plano do usuárioooooo:", this.planoDoUsuario);
  }

  onSubmit() {

    console.log("Quantidade de Tags:", this.quantidadeTags);
    localStorage.setItem('quantidadeTags', this.quantidadeTags.toString());

    console.log("Quantidade de dias:", this.quantidadeDias);
    localStorage.setItem('quantidadeDias', this.quantidadeDias.toString());

    //const planoDoUsuario = localStorage.getItem('plano');
    //console.log("Plano do usuário:", planoDoUsuario);
    const planoDoUsuario = this.userData.plano;
    
    const userCard = localStorage.getItem('userCard');
    console.log("Cartão do usuário:", userCard);
    console.log("NUMEROS:", this.userCardNumber);

    
    // verifica

    if(this.userCardNumber === '' || this.userCardNumber === null){
      this.router.navigate(['/pagamento']);
    }
    else{
      this.router.navigate(['/possui']);
    }


    //if (planoDoUsuario === '6716a54052a0be5933feebc5'){
    //  if (userCard === '') {
    //    this.router.navigate(['/pagamento']);
    //  } else {
    //    this.router.navigate(['/possui']);
    //  }
    //}
    //else {
    //    this.router.navigate(['/possui']);
    //}

  }
}

