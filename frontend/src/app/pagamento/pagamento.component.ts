import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';  // Para usar no lugar de toPromise()
import { Console } from 'console';

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

  private apiUrl = 'http://localhost:4200'; // URL do servidor NestJS
  private javaApiUrl = 'http://localhost:8080/validarcartao'; // URL do servidor Java

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    const userEmail = localStorage.getItem('userEmail');
    console.log('PagamentoComponent inicializado');
    console.log("Email do usuário logado:", userEmail);
  }

    // Validação do cartão com chamada ao servidor Java
    async validarCartao(): Promise<boolean> {
      try {
        const urlComNumeroCartao = `${this.javaApiUrl}?numeroCartao=${this.pagamento.cardNumber}`;
        const isValid = await firstValueFrom(
          this.http.post<boolean>(urlComNumeroCartao, {})
        );
        if (!isValid) {
          this.errorMessage = 'Número de cartão inválido. Verifique os dados.';
        } else {
          this.errorMessage = ''; // Limpa a mensagem de erro se o cartão for válido
        }
        return isValid;
      } catch (error) {
        this.errorMessage = 'Erro ao validar o cartão. Tente novamente.';
        console.error("Erro de validação de cartão:", error);
        return false;
      }
    }

  // Submissão do formulário de pagamento
  async onSubmit() {
    if (!this.pagamento.termsAccepted) {
      this.errorMessage = 'Você precisa aceitar os termos para continuar.';
      return;
    }

    // Log detalhado das informações do pagamento
    console.log('=== Detalhes do Pagamento ===');
      console.log(`Número do Cartão: ${this.pagamento.cardNumber}`);
      console.log(`Nome no Cartão: ${this.pagamento.cardName}`);
      console.log(`CVV: ${this.pagamento.cvv}`);
      console.log(`Data de Validade: ${this.pagamento.expiryDate}`);
      console.log(`Termos aceitos: ${this.pagamento.termsAccepted}`);
      console.log('========================');

    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      this.errorMessage = 'Usuário não identificado';
      return;
    }

    const dadosPagamento = {
      email: userEmail,
      card: [{
        num: this.pagamento.cardNumber,
        nome: this.pagamento.cardName,
        val: this.pagamento.expiryDate
      }]
    };

    // Validação do cartão antes de enviar
    const isValidCartao = await this.validarCartao();
    if (!isValidCartao) {
      console.log("Número do cartão inválido.");
      return; // Não enviar os dados para o servidor se o cartão for inválido
    }

    // URL correta apontando para o servidor na porta 4200
    this.http.patch(`${this.apiUrl}/pagamento/atualizar`, dadosPagamento)
      .subscribe({
        next: (response: any) => {
          console.log('Pagamento atualizado com sucesso:', response);
          this.router.navigate(['/menu']);
        },
        error: (error) => {
          console.error('Erro ao atualizar pagamento:', error);
          this.errorMessage = 'Erro ao processar pagamento. Tente novamente.';
        }
      });
  }
}

