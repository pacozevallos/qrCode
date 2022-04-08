import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarNegocioComponent } from './eliminar-negocio.component';

describe('EliminarNegocioComponent', () => {
  let component: EliminarNegocioComponent;
  let fixture: ComponentFixture<EliminarNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
