import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'socorroooooo';

  services = [
        { title: 'Serviço 1', description: 'Descrição do serviço 1' },
        { title: 'Serviço 2', description: 'Descrição do serviço 2' },
        { title: 'Serviço 3', description: 'Descrição do serviço 3' }
      ];

  ngOnInit() {
    console.log('HomeComponent inicializado');
  }
}