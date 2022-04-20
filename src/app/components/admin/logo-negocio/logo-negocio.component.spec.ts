import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoNegocioComponent } from './logo-negocio.component';

describe('LogoNegocioComponent', () => {
  let component: LogoNegocioComponent;
  let fixture: ComponentFixture<LogoNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
