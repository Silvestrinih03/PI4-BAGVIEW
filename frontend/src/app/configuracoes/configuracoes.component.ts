import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.css'
})
export class ConfiguracoesComponent {
  constructor(private router: Router) {}


  ngOnInit() {
    console.log('ConfiguracoesComponent inicializado');
    console.log("Email do usuário logado:", localStorage.getItem('userEmail'));
  }



}
