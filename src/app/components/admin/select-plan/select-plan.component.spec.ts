import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPLanComponent } from './select-plan.component';

describe('SelectPLanComponent', () => {
  let component: SelectPLanComponent;
  let fixture: ComponentFixture<SelectPLanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPLanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPLanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
