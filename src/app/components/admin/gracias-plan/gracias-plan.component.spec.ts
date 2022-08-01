import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraciasPlanComponent } from './gracias-plan.component';

describe('GraciasPlanComponent', () => {
  let component: GraciasPlanComponent;
  let fixture: ComponentFixture<GraciasPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraciasPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraciasPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
