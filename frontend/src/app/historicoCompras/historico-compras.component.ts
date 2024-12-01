import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { ObjectId } from 'bson';
import { ObjectId } from 'mongodb';

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
  qtdTags: number = 0;


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
          next: async () => {
            const qtdTags = this.registroSelecionado.qtdTags;
            // FAZ ANTES
            //console.log("Registro selecionado: ", this.registroSelecionado)
            //const numeroDoVoo = this.registroSelecionado.numVoo;
            //const condicaoId = this.registroSelecionado.condicaoId;
            //console.log("Numero do voo: ", numeroDoVoo)
            //const response = await fetch(`http://localhost:4200/historicoCompras/${this.idUser}/voo/${numeroDoVoo}/condicao/${condicaoId}`);
            //if (!response.ok) {
            //    console.error('Erro ao buscar compra para o usuário, condicaoId e Voo:', response.statusText);
            //    throw new Error('Erro ao buscar compra para o usuário,condicaoId e Voo');
            //}
            const response = await fetch(`http://localhost:4200/voos/${this.registroSelecionado.numVoo}`);
            if (!response.ok) {
                console.error('Erro ao buscar voo:', response.statusText);
                throw new Error('Erro ao buscar voo');
            }
            //console.log("Resposta da busca: ", response)
            const dadosDoVoo = await response.json();
            console.log("Dados do Voo: ", dadosDoVoo)
            const lugar = dadosDoVoo.origem;
            const idTagsTotal: any[] = [];
            const idTags: ObjectId[] = [];
            // mudar o status para qtdTags
            
            const tags = await this.http.post(`http://localhost:4200/tags/filter`, {local: lugar, status: false}).toPromise();
            console.log("Tags recebidas", tags);

            // Adiciona apenas os campos _id ao vetor idTags
            if (Array.isArray(tags)) {
                tags.forEach(tag => {
                    if (tag._id) {
                        idTagsTotal.push(tag._id); // Adiciona o _id ao vetor idTags
                    }
                });
            }

            console.log("IDs de todas as tags: ", idTagsTotal); // Exibe todos os IDs das tags

            // adiciona a qtd q o usuario comprou
            for (let i = 0; i < qtdTags; i++) {
              idTags.push(idTagsTotal[i]);
            }
            console.log("IDs das tags a serem alugadas: ", idTags);


            // mudar o status das tags alugadas para true
            for (let t = 0; t < idTags.length; t++) {
              const response2 = await this.http.patch(`http://localhost:4200/tags/updateStatus`, {idTag: idTags[t], status: true}).toPromise();
            }
            // mudou pra true??

            // Atualiza a condição no frontend
            this.registroSelecionado.condicaoId = '673d46d835c68f866f8cdbec';
            this.showModal = false;
            // aqui -- pega o numero do voo
            

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
  async onFinalizar(): Promise<void> {
    console.log('Finalizar clicado');
  
    if (this.registroSelecionado) {
      const atualizadoRegistro = {
        ...this.registroSelecionado,
        condicaoId: '673d46d835c68f866f8cdbed',
      };
  
      this.http
        .put(
          `http://localhost:4200/historicoCompras/${this.registroSelecionado._id}`,
          atualizadoRegistro
        )
        .subscribe({
          next: async () => {
            const qtdTags = this.registroSelecionado.qtdTags;
            console.log("Número do voo a ser finalizado:", this.registroSelecionado.numVoo);
  
            try {
              // Busca dados do voo
              const response = await fetch(`http://localhost:4200/voos/${this.registroSelecionado.numVoo}`);
              if (!response.ok) throw new Error('Erro ao buscar voo');
  
              const dadosDoVoo = await response.json();
              const origem = dadosDoVoo.origem;
              const destino = dadosDoVoo.destino;
  
              console.log("Origem:", origem);
              console.log("Destino:", destino);
  
              // Busca tags no local de origem que estão alugadas
              const idTagsTotal: any[] = [];
              const tags = await this.http.post(
                `http://localhost:4200/tags/filter`,
                { local: origem, status: true }
              ).toPromise();
  
              if (Array.isArray(tags)) {
                tags.forEach(tag => tag._id && idTagsTotal.push(tag._id));
              }
  
              const idTags = idTagsTotal.slice(0, qtdTags);
              console.log("IDs das tags a serem finalizadas:", idTags);
  
              // Atualiza o local de todas as tags de uma vez
              console.log('IDs DAS TAGS: ', idTags);
              console.log('LOCAL: ', destino);
              const responseUpdateLocal = await this.http
                .patch(`http://localhost:4200/tags/updateLocal`, {
                  idTag: idTags, // Envia array completo de IDs
                  local: destino
                })
                .toPromise();
              console.log("Resultado da atualização do local:", responseUpdateLocal);
  
              // Atualiza o status das tags para 'false'
              await Promise.all(
                idTags.map(tagId =>
                  this.http.patch(`http://localhost:4200/tags/updateStatus`, { idTag: tagId, status: false }).toPromise()
                )
              );
  
              console.log("Status das tags atualizado para 'false'.");
  
              // Atualiza a condição no frontend
              this.registroSelecionado.condicaoId = '673d46d835c68f866f8cdbed';
              this.showModal = false;
  
            } catch (error) {
              console.error('Erro durante a finalização:', error);
              alert('Ocorreu um erro ao finalizar o voo.');
            }
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