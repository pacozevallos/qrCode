import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCelularComponent } from './agregar-celular.component';

describe('AgregarCelularComponent', () => {
  let component: AgregarCelularComponent;
  let fixture: ComponentFixture<AgregarCelularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCelularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCelularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
