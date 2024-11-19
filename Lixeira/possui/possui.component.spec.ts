import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PossuiComponent } from './possui.component';

describe('PossuiComponent', () => {
  let component: PossuiComponent;
  let fixture: ComponentFixture<PossuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PossuiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PossuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
