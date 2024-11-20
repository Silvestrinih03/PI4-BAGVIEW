import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historico-compras',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule 
  ],
  templateUrl: './historico-compras.component.html',
  styleUrls: ['./historico-compras.component.css']
})
export class HistoricoComprasComponent implements OnInit {
  historicoCompras: any[] = []; // Array para armazenar os registros do histórico de compras
  idUser: any = null; // Dados do usuário
  condicoes: any;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    await this.carregarUsuario();
    await this.fetchCondicoes();
    await this.fetchHistoricoCompras();
  }

  // Função para carregar informações do usuário
  private async carregarUsuario() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    try {
      const response = await fetch(`http://localhost:4200/users/${userEmail}`);
      if (!response.ok) throw new Error('Erro ao buscar dados do usuário');

      const userData = await response.json();
      this.idUser = userData._id;
      console.log('ID do usuário:', this.idUser);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  }

   // Função para buscar o histórico de compras do usuário logado
   private async fetchHistoricoCompras() {
    if (!this.idUser) {
      console.log('ID do usuário não encontrado');
      return; // Se o idUser for nulo, não faz a requisição
    }

    console.log('Buscando histórico de compras para o usuário:', this.idUser);
    this.http
      .get<any[]>(`http://localhost:4200/historicoCompras/${this.idUser}`)
      .subscribe({
        next: (data) => {
          this.historicoCompras = data; // Atribui o histórico de compras retornado pela API
          console.log(this.historicoCompras); // Verifique os dados no console
        },
        error: (err) => {
          console.error('Erro ao buscar histórico de compras:', err);
        }
      });
  }

  // Função para buscar as condicoes do banco
  private async fetchCondicoes() {

    console.log('Buscando condições cadastradas no banco');
    this.http
      .get<any[]>(`http://localhost:4200/condicoes`)
      .subscribe({
        next: (data) => {
          this.condicoes = data; // Atribui o histórico de compras retornado pela API
          console.log(this.condicoes); // Verifique os dados no console
        },
        error: (err) => {
          console.error('Erro ao buscar condições', err);
        }
      });
  }

  // Função para exibir os detalhes do registro de compra
  onAcaoClick(registro: any): void {
    alert(`Detalhes do registro: \nData Aluguel: ${registro.retirada}\nData Finalização: ${registro.devolucao}\nCondição: ${registro.condicao}`);
  }
}