import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SocketService } from './pagamento.socket.service';

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

  constructor(
    private router: Router,
    private http: HttpClient,
    private socketService: SocketService
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
    
    try {
      console.log('Validando cartão com o servidor...');
      // Conecta ao servidor
      await this.socketService.connectToServer('127.0.0.1', 3000);

      // Valida o cartão com o servidor
      const isCardValid = await this.socketService.sendCardData(this.pagamento.cardNumber);

      if (!isCardValid) {
        this.errorMessage = 'O cartão é inválido. Verifique os dados e tente novamente.';
        return;
      }

      console.log('Cartão válido. Prosseguindo com o cadastro...');
      this.atualizarPagamento(dadosPagamento);

    } catch (error) {
      console.error('Erro ao validar o cartão:', error);
      this.errorMessage = 'Erro ao validar o cartão. Tente novamente mais tarde.';
    }
  }
   
  // Atualizar pagamento no backend
  atualizarPagamento(dadosPagamento: any) {
    this.http.patch(`${this.apiUrl}/pagamento/atualizar`, dadosPagamento)
      .subscribe({
        next: (response: any) => {
          console.log('Pagamento atualizado com sucesso:', response);
          const alugou = localStorage.getItem('quantidadeTags');
          const rota = alugou ? '/concluido' : '/menu';
          this.router.navigate([rota]);
        },
        error: (error) => {
          console.error('Erro ao atualizar pagamento:', error);
          this.errorMessage = 'Erro ao processar pagamento. Tente novamente.';
        }
      });
  }
}