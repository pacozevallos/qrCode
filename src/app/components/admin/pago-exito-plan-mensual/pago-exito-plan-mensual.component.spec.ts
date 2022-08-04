import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoExitoPLanMensualComponent } from './pago-exito-plan-mensual.component';

describe('PagoExitoPLanMensualComponent', () => {
  let component: PagoExitoPLanMensualComponent;
  let fixture: ComponentFixture<PagoExitoPLanMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoExitoPLanMensualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoExitoPLanMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
