import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTerminosComponent } from './page-terminos.component';

describe('PageTerminosComponent', () => {
  let component: PageTerminosComponent;
  let fixture: ComponentFixture<PageTerminosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTerminosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTerminosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
