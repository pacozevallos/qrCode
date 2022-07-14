import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterNegocioComponent } from './footer-negocio.component';

describe('FooterNegocioComponent', () => {
  let component: FooterNegocioComponent;
  let fixture: ComponentFixture<FooterNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
