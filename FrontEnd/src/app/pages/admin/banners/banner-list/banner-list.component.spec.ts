import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { AdminBannerListComponent } from './banner-list.component';

describe('AdminBannerListComponent', () => {
  let component: AdminBannerListComponent;
  let fixture: ComponentFixture<AdminBannerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [AdminBannerListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBannerListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
