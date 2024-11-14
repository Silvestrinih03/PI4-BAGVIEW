import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importa o componente que será testado
import { HomepageComponent } from './homepage.component';

// Descreve o conjunto de testes para o HomepageComponent
describe('HomepageComponent', () => {
  let component: HomepageComponent; // Declara a variável do componente
  let fixture: ComponentFixture<HomepageComponent>; // Declara a variável do fixture

  // Configura o ambiente de teste antes de cada teste
  beforeEach(async () => {
    // Configura o módulo de teste com o HomepageComponent
    await TestBed.configureTestingModule({
      imports: [HomepageComponent], // Importa o componente para o teste
    }).compileComponents(); // Compila os componentes

    // Cria uma instância do componente e do fixture
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance; // Atribui a instância do componente
    fixture.detectChanges(); // Detecta mudanças no fixture
  });

  // Testa se o componente foi criado com sucesso
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica se o componente é verdadeiro (existe)
  });
});
