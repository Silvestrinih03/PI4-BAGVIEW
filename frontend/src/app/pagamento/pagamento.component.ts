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
  planoDoUsuario: string = '';
  preco: string = '';

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

    // Função para verificar se o cartão é válido
    isValido(expiryDate: string): boolean {
      const [year, month] = expiryDate.split('-').map(num => parseInt(num, 10));
  
      // Formatar a data de validade (ano-mês) e a data atual (ano-mês)
      const expiryFormatted = `${year}-${month.toString().padStart(2, '0')}`;
      const currentDate = new Date();
      const currentFormatted = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
  
      // Comparar as datas no formato 'YYYY-MM'
      return expiryFormatted >= currentFormatted;
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

    // Verificação de validade do cartão
    const isCardExpired = !this.isValido(this.pagamento.expiryDate);  // Se for expirado, retornar 'false'
    if (isCardExpired) {
      this.errorMessage = 'O cartão está expirado. Verifique a data de validade.';
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
          const alugou = localStorage.getItem('quantidadeTags')
          if (alugou === null || alugou === ''){
            this.router.navigate(['/menu']);
          }
          else{
            this.router.navigate(['/concluido']);
          }
        },
        error: (error) => {
          console.error('Erro ao atualizar pagamento:', error);
          this.errorMessage = 'Erro ao processar pagamento. Tente novamente.';
        }
      });


  }
}

