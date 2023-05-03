import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePoliticaComponent } from './page-politica.component';

describe('PagePoliticaComponent', () => {
  let component: PagePoliticaComponent;
  let fixture: ComponentFixture<PagePoliticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePoliticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePoliticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
