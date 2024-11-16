/// <reference types="@types/google.maps" />

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  map!: google.maps.Map;
  infoWindow!: google.maps.InfoWindow;

  ngOnInit(): void {
    console.log('MenuComponent inicializado');
    this.initMap();
  }

  initMap(): void {
    // Aguarda um momento para garantir que o elemento do mapa esteja renderizado
    setTimeout(() => {
      const mapElement = document.getElementById('map');
      if (mapElement) {
        this.map = new google.maps.Map(mapElement, {
          center: { lat: -23.5505, lng: -46.6333 }, // Coordenadas de São Paulo
          zoom: 12,
        });

        this.infoWindow = new google.maps.InfoWindow();

        const locationButton = document.createElement('button');
        locationButton.textContent = 'Localização Atual';
        locationButton.classList.add('custom-map-control-button');
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

        locationButton.addEventListener('click', () => this.panToCurrentLocation());
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
          console.log(`Latitude: ${pos.lat}, Longitude: ${pos.lng}`);
          this.infoWindow.setPosition(pos);
          this.infoWindow.setContent('Você está aqui.');
          this.infoWindow.open(this.map);
          this.map.setCenter(pos);
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
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation."
    );
    this.infoWindow.open(this.map);
  }
}
