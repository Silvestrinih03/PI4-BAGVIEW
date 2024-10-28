import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthClientService } from '../services/auth-client.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  providers: [AuthClientService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  errorMessage: string = '';

  private authService = inject(AuthClientService);
  private router = inject(Router);

  onSubmit() {
    this.errorMessage = '';
    
    this.authService.login(this.email, this.senha).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido:', response);
        this.authService.setUserData(response.user);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erro no login:', error);
        this.errorMessage = 'Email ou senha incorretos';
      }
    });
  }
}