import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-alugar-tag',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './alugar.component.html',
  styleUrls: ['./alugar.component.css']
})
export class AlugarComponent implements OnInit {
  voos: any[] = []; // Lista de voos
  filteredVoos: any[] = []; // Voos filtrados
  numVooControl: FormControl = new FormControl(); // Controle de input para o filtro de voo
  numVoo: string = ''; // Número do voo selecionado
  quantidadeTags: number = 1; // Quantidade de tags
  planoDoUsuario: string = ''; // Plano do usuário
  userData: any = null; // Dados do usuário
  userCardNumber: string = ''; // Número do cartão do usuário

  constructor(private router: Router) {}

  async ngOnInit() {
    console.log("===============================");
    console.log('AlugarComponent inicializado');
    
    // Carregar a lista de voos (substitua a URL com a do seu backend)
    try {
      const response = await fetch('http://localhost:4200/voos'); // Supondo que sua API de voos esteja nessa URL
      if (!response.ok) {
        throw new Error('Erro ao buscar voos');
      }

      // Transformando os dados para incluir apenas o número do voo
      const data = await response.json();
      this.voos = data.map((voo: any) => ({ numVoo: voo.numvoo }));
      this.filteredVoos = this.voos;

      console.log('Lista de voos (apenas números):', this.voos);
    } catch (error) {
      console.error('Erro ao buscar voos:', error);
    }

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

    // Filtro de voos por digitação
    this.numVooControl.valueChanges.subscribe(value => {
      this.filteredVoos = this.filterVoos(value);
    });
  }

  // Função para filtrar os voos conforme o texto digitado
  filterVoos(value: string) {
    const filterValue = value.toLowerCase();
    return this.voos.filter(voo => voo.numVoo.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    console.log("Quantidade de Tags:", this.quantidadeTags);
    localStorage.setItem('quantidadeTags', this.quantidadeTags.toString());

    const userCard = localStorage.getItem('userCard');
    console.log("Cartão do usuário:", userCard);

    if (!this.userCardNumber) {
      this.router.navigate(['/pagamento']);
    } else {
      this.router.navigate(['/possui']);
    }
  }
}