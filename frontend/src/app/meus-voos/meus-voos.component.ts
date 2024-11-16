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
  selector: 'app-meus-voos',
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
  templateUrl: './meus-voos.component.html',
  styleUrl: './meus-voos.component.css'
})
export class MeusVoosComponent implements OnInit{

  userData: any = null;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  async ngOnInit() {

    console.log('MeusVoosComponent inicializado');
    const userEmail = localStorage.getItem('userEmail');
    console.log("Email do usuário logado:", userEmail);

    if (userEmail) {
      try {
        const response = await fetch(`http://localhost:4200/users/${userEmail}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar usuário');
        }
        this.userData = await response.json();
        console.log('Dados do usuário:', this.userData);

        if (this.userData && this.userData.idFlights) {
          console.log('idFlights do usuário:', this.userData.idFlights);
          // OBS: O PRIMEIRO[0] ELEMENTO DO VETOR É UM ID "FANTASMA" -> NÃO CONSIDERAR QUANDO FOR FAZER A LISTAGEM
          // COMEÇAR A LISTAGEM A PARTIR DO SEGUNDO[1] ELEMENTO DO VETOR
        } else {
          console.log('idFlights vazio ou usuário não encontrado');
        }

      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }
  }

  

}
