import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MejoraPlanComponent } from './mejora-plan.component';

describe('MejoraPlanComponent', () => {
  let component: MejoraPlanComponent;
  let fixture: ComponentFixture<MejoraPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MejoraPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MejoraPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
