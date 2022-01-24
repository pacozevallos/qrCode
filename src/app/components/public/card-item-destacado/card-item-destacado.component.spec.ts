import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardItemDestacadoComponent } from './card-item-destacado.component';

describe('CardItemDestacadoComponent', () => {
  let component: CardItemDestacadoComponent;
  let fixture: ComponentFixture<CardItemDestacadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardItemDestacadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardItemDestacadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
