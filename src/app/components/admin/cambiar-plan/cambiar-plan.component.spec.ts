import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarPLanComponent } from './cambiar-plan.component';

describe('CambiarPLanComponent', () => {
  let component: CambiarPLanComponent;
  let fixture: ComponentFixture<CambiarPLanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarPLanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarPLanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
