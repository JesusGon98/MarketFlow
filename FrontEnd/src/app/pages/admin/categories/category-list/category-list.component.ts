import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Category } from '../../../../core/models/category.model';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-admin-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class AdminCategoryListComponent implements OnInit {
  public categories: Category[] = [];
  public loading = true;
  public error = false;
  public categoryToDelete?: Category;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  public confirmDelete(category: Category): void {
    this.categoryToDelete = category;
  }

  public cancelDelete(): void {
    this.categoryToDelete = undefined;
  }

  public deleteCategory(): void {
    if (!this.categoryToDelete) return;

    this.categoryService.delete(this.categoryToDelete.id).subscribe({
      next: () => {
        this.categoryToDelete = undefined;
        this.loadCategories();
      },
      error: () => {
        this.categoryToDelete = undefined;
        this.error = true;
        this.cdr.detectChanges();
      },
    });
  }

  private loadCategories(): void {
    this.loading = true;

    this.categoryService.getAll({ limit: 100 }).subscribe({
      next: (response) => {
        this.categories = response.data.items;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.error = true;
        this.cdr.detectChanges();
      },
    });
  }
}
