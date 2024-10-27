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

  ngOnInit() {
    console.log('HomeComponent inicializado');
  }
}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent {
//   services = [
//     { title: 'Serviço 1', description: 'Descrição do serviço 1' },
//     { title: 'Serviço 2', description: 'Descrição do serviço 2' }
//   ];
// }
