import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasTagsComponent } from './minhas-tags.component';

describe('MinhasTagsComponent', () => {
  let component: MinhasTagsComponent;
  let fixture: ComponentFixture<MinhasTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhasTagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhasTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
