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
  selector: 'app-adicionar-voo',
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
  templateUrl: './adicionar-voo.component.html',
  styleUrls: ['./adicionar-voo.component.css']
})
export class AdicionarVooComponent implements OnInit {

  userData: any = null;
  flightData: any = null;
  codigoVoo: string = '';

  constructor(private router: Router) {}

  async ngOnInit() {
    console.log("AdicionarVooComponent inicializado");

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
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }
  }

  async onSubmit() {
    console.log("Código do voo:", this.codigoVoo);
    console.log("Submit");

    if (this.codigoVoo) {
      try {
        const response = await fetch(`http://localhost:4200/voos/${this.codigoVoo}`); // Corrigido para a porta 3000
        if (!response.ok) {
          throw new Error('Erro ao buscar voo');
        }
        this.flightData = await response.json();
        console.log('Dados do voo encontrado:', this.flightData);

        // Adiciona o número do voo ao vetor idFlights do usuário
        const email = this.userData.email;
        if (email) {
          const addFlightResponse = await fetch(`http://localhost:4200/users/adicionarvoo`, { // Corrigido para a rota do controller
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, numVoo: this.codigoVoo }), // Envia o email e o número do voo no corpo da requisição
          });

          if (!addFlightResponse.ok) {
            throw new Error('Erro ao adicionar voo ao usuário');
          }

          console.log('Voo adicionado ao usuário com sucesso');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do voo:', error);
      }
    }
  }
}
