import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroComponent } from './cadastro.component';

// Descreve o conjunto de testes para o CadastroComponent
describe('CadastroComponent', () => {
  let component: CadastroComponent; // Instância do componente a ser testado
  let fixture: ComponentFixture<CadastroComponent>; // Fixture para o componente

  // Configuração do ambiente de teste antes de cada teste
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroComponent], // Importa o componente a ser testado
    }).compileComponents(); // Compila os componentes

    // Cria a fixture do componente e obtém a instância do componente
    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta mudanças no componente
  });

  // Teste para verificar se o componente é criado corretamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica se a instância do componente é verdadeira
  });
});
