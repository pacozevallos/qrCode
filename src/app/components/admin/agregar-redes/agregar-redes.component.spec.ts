import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRedesComponent } from './agregar-redes.component';

describe('AgregarRedesComponent', () => {
  let component: AgregarRedesComponent;
  let fixture: ComponentFixture<AgregarRedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarRedesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarRedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
