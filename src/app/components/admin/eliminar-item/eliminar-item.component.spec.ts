import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarItemComponent } from './eliminar-item.component';

describe('EliminarItemComponent', () => {
  let component: EliminarItemComponent;
  let fixture: ComponentFixture<EliminarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
