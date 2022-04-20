import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNegocioAdminComponent } from './card-negocio-admin.component';

describe('CardNegocioAdminComponent', () => {
  let component: CardNegocioAdminComponent;
  let fixture: ComponentFixture<CardNegocioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardNegocioAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNegocioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
