import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  title = 'socorro';

  ngOnInit() {
    console.log('CadastroComponent inicializado');
  }
}