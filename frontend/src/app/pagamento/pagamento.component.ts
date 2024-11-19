import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule
  ]
})
export class PagamentoComponent {
  pagamento = {
    horasVoo: 1,
    cardNumber: '',
    cardName: '',
    cvv: '',
    expiryDate: '',
    termsAccepted: false
  };

  errorMessage: string = '';
  planoDoUsuario: string = '';
  preco: string = '';

  private apiUrl = 'http://localhost:4200';
  private apiValidacao = 'http://localhost:5000';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    const userEmail = localStorage.getItem('userEmail');
    console.log('PagamentoComponent inicializado');
    console.log("Email do usuário logado:", userEmail);
    
    this.planoDoUsuario = localStorage.getItem('plano') || '';
    console.log("Plano do usuário:", this.planoDoUsuario);

    if (this.planoDoUsuario === '6716a54052a0be5933feebc5') {
        console.log("EH TEMPORARIO");
        const qtdTags = localStorage.getItem('quantidadeTags');
        const qtdTagsNumber = qtdTags ? parseFloat(qtdTags) : 0;
        const qtdDias = localStorage.getItem('quantidadeDias');
        const qtdDiasNumber = qtdDias ? parseFloat(qtdDias) : 0;
        this.preco = (qtdDiasNumber * qtdTagsNumber * 11.90).toFixed(2);
        console.log("Preco a ser exibido:", this.preco);
    }
  }

  async onSubmit() {
    if (!this.pagamento.termsAccepted) {
      this.displayError('Você precisa aceitar os termos para continuar.');
      return;
    }
  
    this.logPaymentDetails();
  
    const userEmail = this.getUserEmail();
    if (!userEmail) {
      this.displayError('Usuário não identificado');
      return;
    }
  
    if (this.isCardExpired(this.pagamento.expiryDate)) {
      this.displayError('O cartão está expirado. Verifique a data de validade.');
      return;
    }
  
    const isValidCard = await this.validateWithSocket('cartao', this.pagamento.cardNumber);
    if (!isValidCard) {
      this.displayError('Cartão inválido');
      return;
    }

    const dadosPagamento = this.buildPaymentData(userEmail);
    this.updatePayment(dadosPagamento);
  }

  private async validateWithSocket(validationType: string, value: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiValidacao}/validar`, { tipoValidacao: validationType, valor: value })
        .subscribe({
          next: (response: any) => {
            console.log('Resposta do servidor:', response);
            resolve(response.valido === true);
          },
          error: (err) => {
            console.error('Erro ao conectar ao servidor:', err.message);
            reject(false);
          }
        });
    });
  }

  private displayError(message: string) {
    this.errorMessage = message;
  }

  private logPaymentDetails() {
    console.log('=== Detalhes do Pagamento ===');
    console.log(`Número do Cartão: ${this.pagamento.cardNumber}`);
    console.log(`Nome no Cartão: ${this.pagamento.cardName}`);
    console.log(`CVV: ${this.pagamento.cvv}`);
    console.log(`Data de Validade: ${this.pagamento.expiryDate}`);
    console.log(`Termos aceitos: ${this.pagamento.termsAccepted}`);
    console.log('========================');
  }

  private getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  private isCardExpired(expiryDate: string): boolean {
    return !this.isValido(expiryDate);
  }

  private isValido(expiryDate: string): boolean {
    const [year, month] = expiryDate.split('-').map(num => parseInt(num, 10));
    const expiryFormatted = `${year}-${month.toString().padStart(2, '0')}`;
    const currentDate = new Date();
    const currentFormatted = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
    return expiryFormatted >= currentFormatted;
  }

  private buildPaymentData(userEmail: string) {
    return {
      email: userEmail,
      card: [{
        num: this.pagamento.cardNumber,
        nome: this.pagamento.cardName,
        val: this.pagamento.expiryDate
      }]
    };
  }

  private updatePayment(dadosPagamento: any) {
    this.http.patch(`${this.apiUrl}/pagamento/atualizar`, dadosPagamento)
      .subscribe({
        next: (response: any) => {
          console.log('Pagamento atualizado com sucesso:', response);
          this.navigateToCompletion();
        },
        error: (error) => {
          console.error('Erro ao atualizar pagamento:', error);
          this.displayError('Erro ao processar pagamento. Tente novamente.');
        }
      });
  }

  private navigateToCompletion() {
    const rota = '/menu';
    this.router.navigate([rota]);
  }
}
