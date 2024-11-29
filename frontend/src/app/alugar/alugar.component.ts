import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-alugar-tag',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './alugar.component.html',
  styleUrls: ['./alugar.component.css'],
})
export class AlugarComponent implements OnInit {
  voos: { numVoo: string; origem: string; destino: string; dataHora: Date }[] = []; // Lista de voos
  filteredVoos: { numVoo: string; origem: string }[] = []; // Voos filtrados
  numVooControl: FormControl = new FormControl(''); // Controle de input para o filtro de voo
  numVoo: string = ''; // Número do voo selecionado
  quantidadeTags: number = 1; // Quantidade de tags a alugar
  userData: any = null; // Dados do usuário
  showModalFinalizacao: boolean = false;
  showModalCaucao: boolean = false;
  showModalCartao: boolean = false;
  showModalAluguelTemp: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  async ngOnInit() {
    console.log('Inicializando AlugarComponent...');
    await this.carregarVoos();
    await this.carregarUsuario();
    this.setupFiltroVoos();
  }

  // Função para carregar lista de voos
  private async carregarVoos() {
    try {
      const response = await fetch('http://localhost:4200/voos');
      if (!response.ok) throw new Error('Erro ao buscar voos');

      const dataAtual = new Date(new Date().setHours(new Date().getHours() - 3));
      console.log("Data atual menos 3 horas:", dataAtual.toISOString());


      const data = await response.json();
      this.voos = data
      .map((voo: any) => ({
        numVoo: voo.numvoo,
        origem: voo.origem,
        destino: voo.destino,
        dataHora: voo.dataHora
      }))
      // Filtra voos com dataHora > dataAtual
      .filter((voo: any) => voo.dataHora > dataAtual.toISOString());
      this.filteredVoos = [...this.voos];
      console.log('Voos carregados:', this.voos);
    } catch (error) {
      console.error('Erro ao carregar voos:', error);
    }
  }

  // Função para carregar informações do usuário
  private async carregarUsuario() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    try {
      const response = await fetch(`http://localhost:4200/users/${userEmail}`);
      if (!response.ok) throw new Error('Erro ao buscar dados do usuário');

      this.userData = await response.json();
      console.log('Dados do usuário carregados:', this.userData);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  }

  // Configura o filtro de voos ao digitar
  private setupFiltroVoos() {
    this.numVooControl.valueChanges.subscribe((value) => {
      const filterValue = (value || '').toLowerCase();
      this.filteredVoos = this.voos.filter((voo) =>
        voo.numVoo.toLowerCase().includes(filterValue)
      );
    });
  }

  // Função para verificar a disponibilidade de tags
  private async verificarDisponibilidadeTags(origem: string, quantidade: number) {
    try {
      const filters = {
        local: origem,
        status: false, // Apenas tags não alugadas
      };
  
      console.log(`Verificando disponibilidade com filtros:`, filters);
  
      const response = await this.http.post<any[]>('http://localhost:4200/tags/filter', filters).toPromise();
      const tagsDisponiveis = response || [];
  
      if (tagsDisponiveis.length < quantidade) {
        const mensagemErro = `Desculpe, há apenas ${tagsDisponiveis.length} tag(s) disponível(is) neste local de partida`;
        alert(mensagemErro);
        console.error(mensagemErro);
        return false;
      }
  
      console.log('Tags disponíveis:', tagsDisponiveis);
  
      // Confirma que existe um cartão cadastrado
      if(!this.userData.card || !this.userData.card[0]?.num) 
        this.showModalCartao = true;

      // Verifica o plano do usuário é mensal
      if (this.userData.idPlan === '6716a54052a0be5933feebc4') {
        this.showModalCaucao = true;
      } else {
        // Plano temporário
        this.showModalAluguelTemp = true;
      }
  
      return true;
    } catch (error) {
      console.error('Erro ao verificar disponibilidade de tags:', error);
      alert('Erro ao verificar disponibilidade de tags. Tente novamente mais tarde.');
      return false;
    }
  }

  // Função para confirmar o aluguel e gerar o histórico de compra
  async confirmarAluguel(): Promise<void> {
    // Calcular o valor do caução
    const caucao = this.quantidadeTags * 50;
    
    // Gerar o histórico de compra
    const historicoCompra = {
      userId: this.userData?._id, // Id do usuário logado
      numVoo: this.numVoo,               // Retirada ainda não realizada
      data: Date.now(),              // Devolução ainda não realizada
      qtdTags: this.quantidadeTags,
      condicaoId: '673d46d835c68f866f8cdbeb', // Condição definida
      caucao: caucao,            // Valor do caução
    };

    try {
      // Envia os dados para o banco de histórico de compras
      await this.http.post('http://localhost:4200/historicoCompras', historicoCompra).toPromise();
      console.log('Histórico de compra gerado:', historicoCompra);
      
      // Fecha o modal de caução e exibe o modal de finalização
      this.showModalCaucao = false;
      this.showModalFinalizacao = true;
    } catch (error) {
      console.error('Erro ao gerar histórico de compra:', error);
      alert('Erro ao gerar o histórico de compra. Tente novamente mais tarde.');
    }
  }

  // Fecha o modal e redireciona para o menu
  confirmarFinalizacao(): void {
    this.showModalFinalizacao = false; // Fecha o modal
    this.router.navigate(['/menu']); // Redireciona para o menu
  }

  confirmarCartao(): void{
    // this.showModalCartao = false;
    this.router.navigate(['/pagamento']);
  }

  cancelarModal(): void {
    this.showModalCaucao = false;
    this.showModalCartao = false;
  }

  // Ação ao enviar o formulário
  async onSubmit() {
    console.log('Formulário enviado:');
    console.log('Número do Voo:', this.numVoo);
    console.log('Quantidade de Tags:', this.quantidadeTags);

    // Encontra o voo correspondente
    const vooSelecionado = this.voos.find((voo) => voo.numVoo === this.numVoo);
    if (!vooSelecionado) {
      alert('Voo não encontrado! Verifique o número do voo.');
      return;
    }

    const origem = vooSelecionado.origem;

    // Verifica a disponibilidade de tags
    const tagsDisponiveis = await this.verificarDisponibilidadeTags(origem, this.quantidadeTags);
    if (!tagsDisponiveis) {
      return; // Interrompe o fluxo caso não haja tags suficientes
    }
  }
}