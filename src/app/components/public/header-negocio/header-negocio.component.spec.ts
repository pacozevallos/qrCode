import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNegocioComponent } from './header-negocio.component';

describe('HeaderNegocioComponent', () => {
  let component: HeaderNegocioComponent;
  let fixture: ComponentFixture<HeaderNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
