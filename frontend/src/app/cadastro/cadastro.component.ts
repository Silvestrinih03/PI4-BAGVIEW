import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AuthClientService } from '../services/auth-client.service';
import { CadastroClientService } from '../services/cadastro-client.service';
import { provideHttpClient } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon'; // Adicione esta linha

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule, // Adicionando HttpClientModule
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule, // Adicione esta linha
    MatButtonModule,
    RouterModule,
    MatSlideToggleModule,
  ],
  providers: [CadastroClientService],
})
export class CadastroComponent {
  usuario = {
    fullName: '',
    email: '',
    password: '',
    cpf: '',
    idPlan: '',
    card: [{
      num: '',
      nome: '',
      val: '',
    }],
    idFlights: [{
      objectId: '',
    }],
    userTags: [{
      objectId: '',
    }],
  };

  confirmaSenha: string = '';
  errorMessage: string = '';
  hide: boolean = true;

  constructor(
    private router: Router,
    private cadastroService: CadastroClientService
  ) {}

  clickEvent(event: MouseEvent) {
    event.preventDefault();
    this.hide = !this.hide;
  }

  onPlanoChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const temporarioOptions = document.getElementById('temporarioOptions');
    if (temporarioOptions) {
      temporarioOptions.style.display = 
        selectElement.value === '6716a54052a0be5933feebc5' ? 'block' : 'none';
    }
  }

  async onSubmit() {
    try {
      if (this.usuario.password !== this.confirmaSenha) {
        this.errorMessage = 'As senhas não coincidem';
        return;
      }

      console.log('=== Detalhes do Cadastro ===');
      console.log(`Plano selecionado: ${this.usuario.idPlan === '6716a54052a0be5933feebc4' ? 'Plano Mensal' : 'Plano Temporário'}`);
      localStorage.setItem('plano', this.usuario.idPlan);
      console.log("Plano do usuário:", this.usuario.idPlan);

      const response = await this.cadastroService.cadastrarUsuario(this.usuario).toPromise();
      console.log('Cadastro realizado com sucesso:', response);
      
      localStorage.setItem('userEmail', this.usuario.email);
      if (this.usuario.idPlan === '6716a54052a0be5933feebc4') {
        await this.router.navigate(['/pagamento']);
      } else {
        await this.router.navigate(['/menu']);
      }
      
    } catch (error) {
      console.error('Erro no cadastro:', error);
      this.errorMessage = 'Erro ao realizar cadastro. Tente novamente.';
    }
  }
}