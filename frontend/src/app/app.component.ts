import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Title } from '@angular/platform-browser';

/**
 * Componente raiz da aplicação.
 * Define o título da aplicação e configura as rotas principais.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /**
   * Título da aplicação exibido no navegador.
   */
  title = 'frontend';

  /**
   * Construtor do componente.
   * @param titleService Serviço para manipulação do título da página.
   */
  constructor(private titleService: Title) {
    this.titleService.setTitle('Bagview');
  }
}
