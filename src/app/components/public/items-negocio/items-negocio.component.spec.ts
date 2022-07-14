import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsNegocioComponent } from './items-negocio.component';

describe('ItemsNegocioComponent', () => {
  let component: ItemsNegocioComponent;
  let fixture: ComponentFixture<ItemsNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
