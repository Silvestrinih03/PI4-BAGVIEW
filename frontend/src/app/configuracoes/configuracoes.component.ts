import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.css'
})
export class ConfiguracoesComponent implements OnInit {
  userData: any = null;
  planoName: string = '';

  constructor(private router: Router) {}

  // Declara constantes para os IDs dos planos
  // private readonly PLANO_TEMPORARIO_ID = '6716a54052a0be5933feebc5';
  // private readonly PLANO_MENSAL_ID = '6716a54052a0be5933feebc4';
//Adiciona um log de erro se userEmail estiver ausente, prevenindo erros no fetch.
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
        
        // Define o nome do plano baseado no idPlan
        if (this.userData.idPlan === '6716a54052a0be5933feebc5') {
          this.planoName = 'Plano Temporário';
        } else if (this.userData.idPlan === '6716a54052a0be5933feebc4') {
          this.planoName = 'Plano Mensal';
        }
        
        console.log('Nome do Plano:', this.planoName);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }
  }
}
