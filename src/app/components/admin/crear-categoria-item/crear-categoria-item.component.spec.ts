import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCategoriaItemComponent } from './crear-categoria-item.component';

describe('CrearCategoriaItemComponent', () => {
  let component: CrearCategoriaItemComponent;
  let fixture: ComponentFixture<CrearCategoriaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCategoriaItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCategoriaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
