import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaQrComponent } from './vista-qr.component';

describe('VistaQrComponent', () => {
  let component: VistaQrComponent;
  let fixture: ComponentFixture<VistaQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaQrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
