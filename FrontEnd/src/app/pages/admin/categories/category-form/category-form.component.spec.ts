import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminCategoryFormComponent } from './category-form.component';

describe('AdminCategoryFormComponent', () => {
  let component: AdminCategoryFormComponent;
  let fixture: ComponentFixture<AdminCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), ReactiveFormsModule],
      declarations: [AdminCategoryFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCategoryFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
