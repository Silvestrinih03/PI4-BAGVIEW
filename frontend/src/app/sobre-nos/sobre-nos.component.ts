import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-sobre-nos',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatExpansionModule],
  templateUrl: './sobre-nos.component.html',
  styleUrl: './sobre-nos.component.css',
})
export class SobreNosComponent implements OnInit {
  // Variáveis para controlar o estado dos painéis
  panel1Open = false;
  panel2Open = false;
  panel3Open = false;

  // Método chamado quando o componente é inicializado
  ngOnInit() {
    if (typeof window !== 'undefined') {
      // Adiciona um listener para o evento de scroll da janela
      window.addEventListener('scroll', this.onScroll);
    }
  }

  // Método para lidar com o evento de scroll
  onScroll = () => {
    // Seleciona o elemento do cabeçalho
    const header = document.querySelector('.header');
    if (header) {
      // Adiciona ou remove a classe 'scrolled' com base na posição do scroll
      if (window.scrollY > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  };
}
