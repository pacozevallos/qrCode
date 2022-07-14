import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestacadosNegocioComponent } from './destacados-negocio.component';

describe('DestacadosNegocioComponent', () => {
  let component: DestacadosNegocioComponent;
  let fixture: ComponentFixture<DestacadosNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestacadosNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestacadosNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
