import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContraseniaComponent } from './contrasenia.component';

describe('ContraseniaComponent', () => {
  let component: ContraseniaComponent;
  let fixture: ComponentFixture<ContraseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContraseniaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
