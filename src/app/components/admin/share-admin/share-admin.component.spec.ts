import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareAdminComponent } from './share-admin.component';

describe('ShareAdminComponent', () => {
  let component: ShareAdminComponent;
  let fixture: ComponentFixture<ShareAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
