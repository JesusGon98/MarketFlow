import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Category } from '../../core/models/category.model';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  public categories: Category[] = [];
  public loading = true;
  public error = false;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
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
