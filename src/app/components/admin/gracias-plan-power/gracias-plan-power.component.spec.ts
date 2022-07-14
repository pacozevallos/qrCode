import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraciasPlanPowerComponent } from './gracias-plan-power.component';

describe('GraciasPlanPowerComponent', () => {
  let component: GraciasPlanPowerComponent;
  let fixture: ComponentFixture<GraciasPlanPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraciasPlanPowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraciasPlanPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
