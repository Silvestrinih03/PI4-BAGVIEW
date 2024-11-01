import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthClientService } from '../services/auth-client.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-alugar-tag',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './alugar.component.html',
  styleUrls: ['./alugar.component.css'] 
})
export class AlugarComponent implements OnInit {
  numeroVoo: string = '';
  quantidadeTags: number = 1;

  ngOnInit() {
    // Inicialização após o componente ser criado
    if (this.quantidadeTags === null) {
      this.quantidadeTags = 1;
    }
  }

  onSubmit() {
    if (this.numeroVoo && this.quantidadeTags > 0) {
      console.log('Submetendo:', {
        numeroVoo: this.numeroVoo,
        quantidadeTags: this.quantidadeTags
      });
      console.log(`Número do Voo: ${this.numeroVoo}\nQuantidade de Tags: ${this.quantidadeTags}`);
    }
  }
}
