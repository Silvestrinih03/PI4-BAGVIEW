/// <reference types="@types/google.maps" />

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  map!: google.maps.Map;
  infoWindow!: google.maps.InfoWindow;
  userId: string | null = null;
  historicoCompras: any[] = [];
  totalHistoricoCompras: number = 0;
  numeroDoVoo: any[] = [];
  dadosVoos: any[] = [];
  origens: any[] = [];
  dadosOrigem: any[] = [];
  coordenadas: any[] = [];

  ngOnInit(): void {
    console.log('MenuComponent inicializado');
    this.initMap();
    this.carregarUsuario().then(() => {
      this.buscarHistoricoCompras().then(() => {
        this.buscarDadosVoos().then(() => {
          this.buscarDadosOrigem();
        });
      });
    });
  }

  ngAfterViewInit(): void {
    const menuToggle = document.getElementById('menuToggle');
    const menuContent = document.getElementById('menuContent');

    if (menuToggle && menuContent) {
      menuToggle.addEventListener('click', () => {
        menuContent.classList.toggle('show');
      });
    } else {
      console.error('Elementos do menu não encontrados');
    }
  }

  initMap(): void {
    // Aguarda um momento para garantir que o elemento do mapa esteja renderizado
    setTimeout(() => {
      const mapElement = document.getElementById('map');
      if (mapElement) {
        this.map = new google.maps.Map(mapElement, {
          center: { lat: -23.5505, lng: -46.6333 }, // Coordenadas de São Paulo
          zoom: 12,
          disableDefaultUI: true, // Desativa todos os controles padrão
          // zoomControl: false,
          // mapTypeControl: false,
          //// scaleControl: false,
          // streetViewControl: true,
          // rotateControl: false,
          // fullscreenControl: false,
        });

        this.infoWindow = new google.maps.InfoWindow();

        const locationButton = document.createElement('button');
        locationButton.textContent = 'Localização Atual';
        locationButton.classList.add('custom-map-control-button');
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
          locationButton
        );

        locationButton.addEventListener('click', () =>
          this.panToCurrentLocation()
        );
      } else {
        console.error('Elemento do mapa não encontrado');
      }
    }, 100);
  }

  panToCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(
            `Latitude do usuário: ${pos.lat}, Longitude do usuário: ${pos.lng}`
          );
          this.infoWindow.setPosition(pos);
          this.infoWindow.setContent('Você está aqui.');
          this.infoWindow.open(this.map);
          this.map.setCenter(pos);

          // MOSTRA AS TAGS!
          this.adicionarPinsAdicionais();
        },
        () => this.handleLocationError(true)
      );
    } else {
      // Browser não suporta Geolocalização
      this.handleLocationError(false);
    }
  }

  handleLocationError(browserHasGeolocation: boolean): void {
    const pos = this.map.getCenter()!;
    this.infoWindow.setPosition(pos);
    this.infoWindow.setContent(
      browserHasGeolocation
        ? 'Erro: O serviço de geolocalização falhou. Por favor, permita o acesso à localização para uma melhor experiência.'
        : 'Erro: Seu navegador não suporta geolocalização.'
    );
    this.infoWindow.open(this.map);

    // Exibe uma mensagem de erro no console
    console.error(
      browserHasGeolocation
        ? 'O usuário negou o acesso à localização.'
        : 'Geolocalização não suportada pelo navegador.'
    );
  }

  // FUNCAO PRA MOSTRAR AS TAGS
  private adicionarPinsAdicionais(): void {
    this.historicoCompras.forEach((compra) => {
      const { qtdTags } = compra; // Obtém a quantidade de tags da compra
      const baseCoord = this.coordenadas[0]; // Supondo que você queira usar a primeira coordenada como base

      for (let i = 0; i < qtdTags; i++) {
        const marker = new google.maps.Marker({
          position: {
            lat: baseCoord.latitude + i * 0.0001, // Ajusta a latitude para cada marcador
            lng: baseCoord.longitude + i * 0.0001, // Ajusta a longitude para cada marcador
          },
          map: this.map,
          title: `Tag ${i + 1} da Compra`, // Título do marcador
        });
      }
    });
  }

  private async carregarUsuario() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.log('Nenhum email de usuário encontrado');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4200/users/${userEmail}`);
      if (!response.ok) throw new Error('Erro ao buscar dados do usuário');

      const userData = await response.json();
      console.log('Dados do usuário:', userData);
      this.userId = userData._id; // Armazena o ID do usuário na variável
      console.log('ID do usuário:', this.userId); // Exibe o ID do usuário no console
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  }

  // BUSCA HISTORICO DE COMPRAS DO USUARIO
  private async buscarHistoricoCompras() {
    if (!this.userId) {
      console.log('ID do usuário não encontrado');
      return;
    }

    const condicaoId = '673d46d835c68f866f8cdbec'; // Condição fixa
    try {
      const response = await fetch(
        `http://localhost:4200/historicoCompras/${this.userId}/condicao/${condicaoId}`
      );
      if (!response.ok) throw new Error('Erro ao buscar histórico de compras');

      this.historicoCompras = await response.json();
      console.log('Histórico de compras:', this.historicoCompras); // Exibe o histórico de compras no console
      this.totalHistoricoCompras = this.historicoCompras.length;
      console.log(
        `Total HistoricoCompras EM USO: ${this.totalHistoricoCompras}`
      );

      // Adiciona os números de voo ao vetor numeroDoVoo
      this.numeroDoVoo = this.historicoCompras.map((item) => item.numVoo); // Extrai numVoo de cada item
      console.log('Números de voo:', this.numeroDoVoo); // Exibe os números de voo no console
    } catch (error) {
      console.error('Erro ao buscar histórico de compras:', error);
    }
  }

  private async buscarDadosVoos() {
    try {
      for (const numVoo of this.numeroDoVoo) {
        const response = await fetch(`http://localhost:4200/voos/${numVoo}`);
        if (!response.ok)
          throw new Error(`Erro ao buscar dados do voo ${numVoo}`);

        const dadosVoo = await response.json();
        this.dadosVoos.push(dadosVoo);
        console.log(`Dados do voo ${numVoo}:`, dadosVoo);
        this.origens = this.dadosVoos.map((item) => item.origem);
        console.log('Origens:', this.origens);
      }

      // Chama buscarDadosOrigem após buscar todos os dados dos voos
      await this.buscarDadosOrigem();

      // Adiciona os pins após todas as origens terem sido processadas
      this.adicionarPinsAdicionais();
    } catch (error) {
      console.error('Erro ao buscar dados dos voos:', error);
    }
  }

  private async buscarDadosOrigem() {
    try {
      for (const origem of this.origens) {
        const response = await fetch(
          `http://localhost:4200/aeropotos/${origem}`
        );
        if (!response.ok)
          throw new Error(`Erro ao buscar dados da origem ${origem}`);

        const dadosOrigem = await response.json();
        this.dadosOrigem.push(dadosOrigem);
        console.log(`Dados da origem ${origem}:`, dadosOrigem);

        // Verifique se os dados retornados têm as propriedades latitude e longitude
        if (
          dadosOrigem.latitude !== undefined &&
          dadosOrigem.longitude !== undefined
        ) {
          this.coordenadas.push({
            latitude: dadosOrigem.latitude,
            longitude: dadosOrigem.longitude,
          });
        } else {
          console.warn(`Coordenadas não encontradas para a origem ${origem}`);
        }

        console.log('Coordenadas:', this.coordenadas);
      }
    } catch (error) {
      console.error('Erro ao buscar dados das origens:', error);
    }
  }

  // Exemplo de outra função que pode utilizar o histórico de compras
  public exibirHistorico() {
    console.log('Exibindo histórico de compras:', this.historicoCompras);
    // Aqui você pode implementar a lógica para exibir o histórico na página
  }
}
