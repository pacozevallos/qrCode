import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContraseniaGraciasComponent } from './contrasenia-gracias.component';

describe('ContraseniaGraciasComponent', () => {
  let component: ContraseniaGraciasComponent;
  let fixture: ComponentFixture<ContraseniaGraciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContraseniaGraciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContraseniaGraciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
