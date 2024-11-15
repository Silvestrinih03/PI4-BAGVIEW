import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivarComponent } from './ativar.component';

describe('AtivarComponent', () => {
  let component: AtivarComponent;
  let fixture: ComponentFixture<AtivarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtivarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
