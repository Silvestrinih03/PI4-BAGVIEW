import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarVooComponent } from './adicionar-voo.component';

describe('AdicionarVooComponent', () => {
  let component: AdicionarVooComponent;
  let fixture: ComponentFixture<AdicionarVooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarVooComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarVooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
