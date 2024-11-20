import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importando FormsModule
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cartao',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatButtonModule, HttpClientModule],
  templateUrl: './cartao.component.html',
  styleUrls: ['./cartao.component.css']
})
export class CartaoComponent implements OnInit {
  userData: any = null;
  dados = {
    horasVoo: 1,
    cardNumber: '',
    cardName: '',
    cvv: '',
    expiryDate: '',
  };

  errorMessage: string = '';

  private apiUrl = 'http://localhost:4200';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}
  
  async ngOnInit() {
    const userEmail = localStorage.getItem('userEmail');

    console.log('CartaoComponent inicializado');
    console.log("Email do usuário logado:", userEmail);

    if (userEmail) {
      try {
        const response = await fetch(`http://localhost:4200/users/${userEmail}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar usuário');
        }
        this.userData = await response.json();
        console.log('Dados do usuário:', this.userData);

      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }
  }

  isValido(expiryDate: string): boolean {
    const [year, month] = expiryDate.split('-').map(num => parseInt(num, 10));
    const expiryFormatted = `${year}-${month.toString().padStart(2, '0')}`;
    const currentDate = new Date();
    const currentFormatted = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
    return expiryFormatted >= currentFormatted;
  }

  async onSubmit() {
    console.log('=== ALTERACAO DOS DADOS DO CARTAO ===');
    console.log(`Número do Cartão: ${this.userData.card[0].num}`); // Usando o valor do input
    console.log(`Nome no Cartão: ${this.userData.card[0].nome}`); // Usando o valor do input
    console.log(`CVV: ${this.dados.cvv}`); // Certifique-se de que você armazena o CVV em dados
    console.log(`Data de Validade: ${this.userData.card[0].val}`); // Usando o valor do input
    console.log('========================');

    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.log("Usuário não identificado");
      this.errorMessage = 'Usuário não identificado';
      return;
    }

    const isCardExpired = !this.isValido(this.userData.card[0].val); // Verificando a validade do cartão
    if (isCardExpired) {
      console.log("O cartão está expirado. Verifique a data de validade.");
      this.errorMessage = 'O cartão está expirado. Verifique a data de validade.';
      return;
    }

    const dadosAlteracao = {
      email: userEmail,
      card: [{
        num: this.userData.card[0].num,
        nome: this.userData.card[0].nome,
        val: this.userData.card[0].val
      }]
    };
    

    this.http.patch(`${this.apiUrl}/pagamento/atualizar`, dadosAlteracao)
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