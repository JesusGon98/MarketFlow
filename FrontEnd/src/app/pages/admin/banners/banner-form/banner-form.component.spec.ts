import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminBannerFormComponent } from './banner-form.component';

describe('AdminBannerFormComponent', () => {
  let component: AdminBannerFormComponent;
  let fixture: ComponentFixture<AdminBannerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), ReactiveFormsModule],
      declarations: [AdminBannerFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBannerFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
