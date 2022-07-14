import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartirItemComponent } from './compartir-item.component';

describe('CompartirItemComponent', () => {
  let component: CompartirItemComponent;
  let fixture: ComponentFixture<CompartirItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompartirItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartirItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
