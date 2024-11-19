import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-concluido',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './concluido.component.html',
  styleUrls: ['./concluido.component.css']
})
export class ConcluidoComponent {
  nuloOuVazio: string = '';

  constructor(private router: Router) {
    // Armazena a quantidade de tags no localStorage como uma string vazia
    localStorage.setItem('quantidadeTags', this.nuloOuVazio);
  }

  // Outros métodos e lógica da classe...
}
