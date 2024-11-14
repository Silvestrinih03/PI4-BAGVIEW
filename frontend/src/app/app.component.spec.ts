import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

// Descreve o conjunto de testes para o AppComponent
describe('AppComponent', () => {
  // Configuração do TestBed antes de cada teste
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // Importa o componente a ser testado
    }).compileComponents();
  });

  // Testa se o aplicativo é criado corretamente
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy(); // Verifica se a instância do app é verdadeira
  });

  // Testa se o título do aplicativo é 'frontend'
  it(`should have the 'frontend' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend'); // Verifica se o título é igual a 'frontend'
  });

  // Testa se o título é renderizado corretamente
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Detecta mudanças no componente
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, frontend'
    ); // Verifica se o texto contém 'Hello, frontend'
  });
});
