import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentNegocioComponent } from './content-negocio.component';

describe('ContentNegocioComponent', () => {
  let component: ContentNegocioComponent;
  let fixture: ComponentFixture<ContentNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
