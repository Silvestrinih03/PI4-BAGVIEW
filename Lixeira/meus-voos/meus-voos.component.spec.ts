import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusVoosComponent } from './meus-voos.component';

describe('MeusVoosComponent', () => {
  let component: MeusVoosComponent;
  let fixture: ComponentFixture<MeusVoosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusVoosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusVoosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
