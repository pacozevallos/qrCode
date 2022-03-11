import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardItemAdminComponent } from './card-item-admin.component';

describe('CardItemAdminComponent', () => {
  let component: CardItemAdminComponent;
  let fixture: ComponentFixture<CardItemAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardItemAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardItemAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
