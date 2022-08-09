import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarNegocioComponent } from './configurar-negocio.component';

describe('ConfigurarNegocioComponent', () => {
  let component: ConfigurarNegocioComponent;
  let fixture: ComponentFixture<ConfigurarNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurarNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
