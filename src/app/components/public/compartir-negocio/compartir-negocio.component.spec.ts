import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartirNegocioComponent } from './compartir-negocio.component';

describe('CompartirNegocioComponent', () => {
  let component: CompartirNegocioComponent;
  let fixture: ComponentFixture<CompartirNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompartirNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartirNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
