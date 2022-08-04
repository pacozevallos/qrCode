import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoExitoPLanAnualComponent } from './pago-exito-plan-anual.component';

describe('PagoExitoPLanAnualComponent', () => {
  let component: PagoExitoPLanAnualComponent;
  let fixture: ComponentFixture<PagoExitoPLanAnualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoExitoPLanAnualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoExitoPLanAnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
