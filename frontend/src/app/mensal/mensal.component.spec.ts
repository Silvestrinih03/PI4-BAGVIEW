import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensalComponent } from './mensal.component';

describe('MensalComponent', () => {
  let component: MensalComponent;
  let fixture: ComponentFixture<MensalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
