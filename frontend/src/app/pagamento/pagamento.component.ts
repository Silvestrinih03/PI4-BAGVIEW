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

  onSubmit() {
    if (!this.pagamento.termsAccepted) {
      this.errorMessage = 'Você precisa aceitar os termos para continuar.';
      return;
    }

    // Aqui você pode adicionar a lógica para processar o pagamento
    console.log('Dados do pagamento:', this.pagamento);
    this.router.navigate(['/menu']);
  }
}
