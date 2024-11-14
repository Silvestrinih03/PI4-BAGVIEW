import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  /**
   * Configura o ambiente de teste antes de cada iteração.
   * Configura o módulo de teste, compila os componentes e inicializa a instância do componente.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Testa se o componente é criado corretamente.
   */
  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
