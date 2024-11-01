import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class PagamentoComponent {
  pagamento = {
    planoId: '',
    horasVoo: 1,
    cardNumber: '',
    cardName: '',
    cvv: '',
    expiryDate: '',
    termsAccepted: false
  };

  errorMessage: string = '';

  onPlanoChange(event: any) {
    // Mostra/esconde opções do plano temporário
    const temporarioOptions = document.getElementById('temporarioOptions');
    if (temporarioOptions) {
      temporarioOptions.style.display = 
        event.target.value === '6716a54052a0be5933feebc5' ? 'block' : 'none';
    }
  }

  constructor(private router: Router) {}
  async ngOnInit() {
    const userEmail = localStorage.getItem('userEmail');
    console.log('PagamentoComponent inicializado');
    console.log("Email do usuário logado:", userEmail);
  }
  onSubmit() {
    if (!this.pagamento.termsAccepted) {
      this.errorMessage = 'Você precisa aceitar os termos para continuar.';
      return;
    }

    // Log detalhado das informações do pagamento
    console.log('=== Detalhes do Pagamento ===');
    console.log(`Plano selecionado: ${this.pagamento.planoId === '6716a54052a0be5933feebc4' ? 'Plano Mensal' : 'Plano Temporário'}`);
    if (this.pagamento.planoId === '6716a54052a0be5933feebc5') {
      console.log(`Horas de voo: ${this.pagamento.horasVoo}`);
    }
    console.log(`Número do Cartão: ${this.pagamento.cardNumber}`);
    console.log(`Nome no Cartão: ${this.pagamento.cardName}`);
    console.log(`CVV: ${this.pagamento.cvv}`);
    console.log(`Data de Validade: ${this.pagamento.expiryDate}`);
    console.log(`Termos aceitos: ${this.pagamento.termsAccepted}`);
    console.log('========================');

    this.router.navigate(['/menu']);
  }
}
