import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTerminosComponent } from './modal-terminos.component';

describe('ModalTerminosComponent', () => {
  let component: ModalTerminosComponent;
  let fixture: ComponentFixture<ModalTerminosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTerminosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTerminosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
