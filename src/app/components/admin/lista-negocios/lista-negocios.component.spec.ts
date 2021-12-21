import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNegociosComponent } from './lista-negocios.component';

describe('ListaNegociosComponent', () => {
  let component: ListaNegociosComponent;
  let fixture: ComponentFixture<ListaNegociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaNegociosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaNegociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
