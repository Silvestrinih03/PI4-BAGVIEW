import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule

@Component({
  selector: 'app-historico-compras',
  standalone: true,
  imports: [
    HttpClientModule
  ],
  templateUrl: './historico-compras.component.html',
  styleUrls: ['./historico-compras.component.css']
})
export class HistoricoComprasComponent implements OnInit {
  historicoCompras: any[] = []; // Array para armazenar os registros do histórico de compras
  idUser: any = null; // Dados do usuário

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    await this.carregarUsuario();
    await this.fetchHistoricoCompras();
  }

  // Função para carregar informações do usuário
  private async carregarUsuario() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    try {
      const response = await fetch(`http://localhost:4200/users/${userEmail}`);
      if (!response.ok) throw new Error('Erro ao buscar dados do usuário');

      this.idUser = await response.json();
      this.idUser = this.idUser.id;
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  }

  // Função para buscar o histórico de compras do usuário logado
  private async fetchHistoricoCompras() {
    if (this.idUser == null) return;
  
    this.http
      .get<any[]>(`http://localhost:4200/historicoCompras/${this.idUser}`)
      .subscribe({
        next: (data) => {
          // Agora a variável historicoCompras conterá os dados diretamente, sem modificações
          this.historicoCompras = data;
          console.log(this.historicoCompras); // Verifique os dados no console
        },
        error: (err) => {
          console.error('Erro ao buscar histórico de compras:', err);
        }
      });
  }

  onAcaoClick(registro: any): void {
    alert(`Detalhes do registro: \nData Aluguel: ${registro.retirada}\nData Finalização: ${registro.devolucao}\nCondição: ${registro.condicao}`);
  }
}