import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {
  userData: any;
  planoName: string = '';

  // Declara constantes para os IDs dos planos
  private readonly PLANO_TEMPORARIO_ID = '6716a54052a0be5933feebc5';
  private readonly PLANO_MENSAL_ID = '6716a54052a0be5933feebc4';
//Adiciona um log de erro se userEmail estiver ausente, prevenindo erros no fetch.
  async ngOnInit() {
    console.log('ConfiguracoesComponent inicializado');
    
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.error('Nenhum e-mail de usuário encontrado no localStorage.');
      return;
    }

    console.log("Email do usuário logado:", userEmail);

    try {
      const response = await fetch(`http://localhost:4200/users/${userEmail}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar usuário: ${response.statusText} (Código: ${response.status})`);
      }
      
      this.userData = await response.json();
      console.log('Dados do usuário:', this.userData);

      this.definirPlano(this.userData.idPlan);

    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  }

  // Função auxiliar para definir o nome do plano com base no ID
  private definirPlano(idPlan: string) {
    switch(idPlan) {
      case this.PLANO_TEMPORARIO_ID:
        this.planoName = 'Plano Temporário';
        break;
      case this.PLANO_MENSAL_ID:
        this.planoName = 'Plano Mensal';
        break;
      default:
        this.planoName = 'Plano desconhecido';
        console.warn('Plano com ID não reconhecido:', idPlan);
    }
    
    console.log('Nome do Plano:', this.planoName);
  }
}
