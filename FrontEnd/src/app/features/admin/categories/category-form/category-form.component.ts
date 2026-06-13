import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: false,
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public saving = false;
  public error = false;
  public isEditMode = false;
  private categoryId = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      description: [''],
      active: [true],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.categoryId = id;
      this.loading = true;

      this.categoryService.getById(id).subscribe({
        next: (response) => {
          this.form.patchValue(response.data);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.error = true;
        },
      });
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const value = this.form.getRawValue();

    const request$ = this.isEditMode
      ? this.categoryService.update(this.categoryId, value)
      : this.categoryService.create(value);

    request$.subscribe({
      next: () => this.router.navigate(['/admin/categories']),
      error: () => {
        this.saving = false;
        this.error = true;
      },
    });
  }

  public onCancel(): void {
    this.router.navigate(['/admin/categories']);
  }
}
