import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContraseniaPublicComponent } from './contrasenia-public.component';

describe('ContraseniaPublicComponent', () => {
  let component: ContraseniaPublicComponent;
  let fixture: ComponentFixture<ContraseniaPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContraseniaPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContraseniaPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
