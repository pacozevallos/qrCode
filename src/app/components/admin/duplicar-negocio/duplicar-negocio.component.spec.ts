import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicarNegocioComponent } from './duplicar-negocio.component';

describe('DuplicarNegocioComponent', () => {
  let component: DuplicarNegocioComponent;
  let fixture: ComponentFixture<DuplicarNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicarNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicarNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
