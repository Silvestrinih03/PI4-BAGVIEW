import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthClientService } from '../services/auth-client.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  ngOnInit() {
    console.log('MenuComponent inicializado');
    //const emailUsuario = this.authService.getUserEmail();
    //console.log('Email do usuário logado:', emailUsuario);
  }
}