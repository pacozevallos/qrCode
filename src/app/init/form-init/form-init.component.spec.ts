import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInitComponent } from './form-init.component';

describe('FormInitComponent', () => {
  let component: FormInitComponent;
  let fixture: ComponentFixture<FormInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
