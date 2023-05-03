import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPoliticaComponent } from './modal-politica.component';

describe('ModalPoliticaComponent', () => {
  let component: ModalPoliticaComponent;
  let fixture: ComponentFixture<ModalPoliticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPoliticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPoliticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
