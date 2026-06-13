import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../core/models/category.model';
import { CategoryService } from '../../../../core/services/category.service';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  public form: FormGroup;
  public categories: Category[] = [];
  public loading = false;
  public saving = false;
  public error = false;
  public isEditMode = false;
  private productId = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      imageUrl: [''],
      active: [true],
    });
  }

  ngOnInit(): void {
    this.categoryService.getAll({ limit: 100 }).subscribe({
      next: (response) => (this.categories = response.data.items),
      error: () => (this.error = true),
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.productId = id;
      this.loading = true;

      this.productService.getById(id).subscribe({
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
      ? this.productService.update(this.productId, value)
      : this.productService.create(value);

    request$.subscribe({
      next: () => this.router.navigate(['/admin/products']),
      error: () => {
        this.saving = false;
        this.error = true;
      },
    });
  }

  public onCancel(): void {
    this.router.navigate(['/admin/products']);
  }
}
