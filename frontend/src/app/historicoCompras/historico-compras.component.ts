import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historico-compras',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './historico-compras.component.html',
  styleUrls: ['./historico-compras.component.css']
})
export class HistoricoComprasComponent implements OnInit {
  historicoCompras: any[] = []; // Armazenar os registros do histórico de compras
  idUser: any = null; // Armazenar o ID do usuário logado
  condicoes: any[] = []; // Armazenar as condições existentes no banco
  condicoesMap: { [key: string]: string } = {}; // Alterar o id da condição para sua descricao
  confirmacao: boolean= false;
  showModal: boolean = false;
  registroSelecionado: any;
  modalType: 'confirmacao' | 'encerramento' | null = null;


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
          this.condicoes.forEach((condicao) => {
            this.condicoesMap[condicao._id] = condicao.descricao; // Mapeando o ID para a descrição
          });
          console.log(this.condicoesMap); // Verifique os dados no console
        },
        error: (err) => {
          console.error('Erro ao buscar condições', err);
        }
      });
  }

  // Método para obter a descrição da condição com base no ID
  getCondicaoDescricao(condicaoId: string): string {
    return this.condicoesMap[condicaoId] || 'Sem condição';
  }

  // Abrir o modal de confirmação
  onAlterarCondicao(registro: any, tipo: 'confirmacao' | 'encerramento'): void {
    console.log(`Abrindo modal de ${tipo} para registro:`, registro);
    this.registroSelecionado = registro;
    this.showModal = true; // Exibe o modal
    this.modalType = tipo; // Define o tipo de modal
    this.showModal = true; // Exibe o modal
  }

  // Ação de confirmação
  onAtivar(): void {
    console.log('Confirmar clicado');
    
    if (this.registroSelecionado) {
      // Atualize a condição do registro no backend
      const atualizadoRegistro = { ...this.registroSelecionado, condicaoId: '673d46d835c68f866f8cdbec' };
  
      this.http
        .put(`http://localhost:4200/historicoCompras/${this.registroSelecionado._id}`, atualizadoRegistro)
        .subscribe({
          next: () => {
            // Atualiza a condição no frontend
            this.registroSelecionado.condicaoId = '673d46d835c68f866f8cdbec';
            this.showModal = false;
          },
          error: (err) => {
            console.error('Erro ao atualizar condição do registro:', err);
            alert('Ocorreu um erro ao tentar alterar a condição do registro.');
          }
        });
    } else {
      alert('Registro não encontrado.');
    }
  }

  // Ação de confirmação
  onFinalizar(): void {
    console.log('Finalizar clicado');
    
    if (this.registroSelecionado) {
      // Atualize a condição do registro no backend
      const atualizadoRegistro = { ...this.registroSelecionado, condicaoId: '673d46d835c68f866f8cdbed' };
  
      this.http
        .put(`http://localhost:4200/historicoCompras/${this.registroSelecionado._id}`, atualizadoRegistro)
        .subscribe({
          next: () => {
            // Atualiza a condição no frontend
            this.registroSelecionado.condicaoId = '673d46d835c68f866f8cdbed';
            this.showModal = false;
          },
          error: (err) => {
            console.error('Erro ao atualizar condição do registro:', err);
            alert('Ocorreu um erro ao tentar alterar a condição do registro.');
          }
        });
    } else {
      alert('Registro não encontrado.');
    }
  }

  // Cancelar e fechar o modal
  onCancelar(): void {
    this.showModal = false; // Fechar o modal
  }
  // Função para exibir os detalhes do registro de compra
  onAcaoClick(registro: any): void {
    alert(`Detalhes do registro: \nData Aluguel: ${registro.retirada}\nData Finalização: ${registro.devolucao}\nCondição: ${registro.condicao}`);
  }
}