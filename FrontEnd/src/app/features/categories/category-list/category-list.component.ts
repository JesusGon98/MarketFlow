import { Component, OnInit } from '@angular/core';
import { Category } from '../../../core/models/category.model';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = [];
  public loading = true;
  public error = false;

  constructor(private readonly categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = response.data.items;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }
}
