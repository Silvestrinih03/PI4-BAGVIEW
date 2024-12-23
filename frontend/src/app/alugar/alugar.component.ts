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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatSnackBarModule
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
  historicoCompras: any[] = [];
  userId: string | null = null;

  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) {}

  async ngOnInit() {
    console.log('Inicializando AlugarComponent...');
    await this.carregarVoos();
    await this.carregarUsuario();
    this.setupFiltroVoos();
    await this.verificarCompras();
    console.log('Compras verificadas:', this.historicoCompras);
  }

  // Função para carregar lista de voos
  private async carregarVoos() {
    try {
      const response = await fetch('http://localhost:4200/voos');
      if (!response.ok) throw new Error('Erro ao buscar voos');
  
      // Obtém a data atual sem horas, minutos e segundos
      const dataAtual = new Date();
      dataAtual.setHours(0, 0, 0, 0);  // Define a hora como 00:00:00
  
      console.log("Data atual (sem hora):", dataAtual.toISOString());
  
      const data = await response.json();
      this.voos = data
        .map((voo: any) => ({
          numVoo: voo.numvoo,
          origem: voo.origem,
          destino: voo.destino,
          dataHora: voo.dataHora
        }))
        // Filtra voos com a mesma data (desconsiderando hora, minutos e segundos)
        .filter((voo: any) => {
          const vooData = new Date(voo.dataHora);
          vooData.setHours(0, 0, 0, 0);  // Remove a hora do voo
  
          return vooData.getTime() === dataAtual.getTime();  // Compara apenas a data
        });
  
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
      this.userId = this.userData._id;
      console.log('ID do usuário:', this.userId);
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
        this.snackBar.open(mensagemErro, "x", {
          duration: 5000, // Duração em milissegundos
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar'], // Classe CSS personalizada, opcional
        });
        
        console.error(mensagemErro);
        return false;
      }
  
      console.log('Tags disponíveis:', tagsDisponiveis);
  
      // Confirma que existe um cartão cadastrado
      if(!this.userData.card || !this.userData.card[0]?.num) 
        this.showModalCartao = true;
      
      // Verifica o plano do usuário é mensal
      else if (this.userData.idPlan === '6716a54052a0be5933feebc4') {
        this.showModalCaucao = true;
      } else {
        // Plano temporário
        this.showModalAluguelTemp = true;
      }
  
      return true;
    } catch (error) {
      console.error('Erro ao verificar disponibilidade de tags:', error);
      this.snackBar.open('Erro ao verificar disponibilidade de tags. Tente novamente mais tarde.', "x", {
        duration: 5000, // Duração em milissegundos
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar'], // Classe CSS personalizada, opcional
      });
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
      this.snackBar.open('Erro ao gerar o histórico de compra. Tente novamente mais tarde.', "x", {
        duration: 5000, // Duração em milissegundos
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar'], // Classe CSS personalizada, opcional
      });
    }
  }

  async verificarCompras(): Promise<void> {
    // Condição 1: Verifica se o userId está definido
    if (!this.userId) {
        console.log('ID do usuário não encontrado');
        return;
    }

    const condicaoId = '673d46d835c68f866f8cdbec'; // EM USO
    const condicaoId2 = '673d46d835c68f866f8cdbeb'; // PENDENTE

    try {
        // Testa a primeira condição
        const response1 = await fetch(`http://localhost:4200/historicoCompras/${this.userId}/condicao/${condicaoId}`);
        if (!response1.ok) {
            console.error('Erro ao buscar histórico de compras para condicaoId:', response1.statusText);
            throw new Error('Erro ao buscar histórico de compras para condicaoId');
        }
        const historicoCompras1 = await response1.json();
        console.log('Histórico de compras para condicaoId:', historicoCompras1);

        // Testa a segunda condição
        const response2 = await fetch(`http://localhost:4200/historicoCompras/${this.userId}/condicao/${condicaoId2}`);
        if (!response2.ok) {
            console.error('Erro ao buscar histórico de compras para condicaoId2:', response2.statusText);
            throw new Error('Erro ao buscar histórico de compras para condicaoId2');
        }
        const historicoCompras2 = await response2.json();
        console.log('Histórico de compras para condicaoId2:', historicoCompras2);

        // Você pode combinar os resultados ou armazená-los conforme necessário
        this.historicoCompras = [...historicoCompras1, ...historicoCompras2];

    } catch (error) {
        console.error('Erro ao buscar histórico de compras:', error);
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
  
  cancelarCartao(): void {
    this.router.navigate(['/menu']); // Redireciona para o menu
  }
  
  cancelarModal(): void {
    this.showModalCaucao = false;
    this.showModalAluguelTemp = false;
  }

  // Ação ao enviar o formulário
  async onSubmit() {
    console.log('Formulário enviado:');
    console.log('Número do Voo:', this.numVoo);
    console.log('Quantidade de Tags:', this.quantidadeTags);

    // Encontra o voo correspondente
    const vooSelecionado = this.voos.find((voo) => voo.numVoo === this.numVoo);
    if (!vooSelecionado) {
      this.snackBar.open('Voo não encontrado! Verifique o número do voo.', "x", {
        duration: 5000, // Duração em milissegundos
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar'], // Classe CSS personalizada, opcional
      });
      return;
    }

    const origem = vooSelecionado.origem;

    if (this.historicoCompras.length > 0) {
      alert('Você já possui uma compra em uso ou pendente!');
      return;
    }
    // Verifica a disponibilidade de tags
    const tagsDisponiveis = await this.verificarDisponibilidadeTags(origem, this.quantidadeTags);
    if (!tagsDisponiveis) {
      return; // Interrompe o fluxo caso não haja tags suficientes
    }
  }
}