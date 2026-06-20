import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { CategoryService } from '../../../core/services/category.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public totalProducts = 0;
  public totalCategories = 0;
  public outOfStockCount = 0;
  public recentProducts: Product[] = [];
  public loading = true;
  public error = false;

  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    forkJoin({
      products: this.productService.getAll({ limit: 100 }),
      categories: this.categoryService.getAll({ limit: 100 }),
    }).subscribe({
      next: ({ products, categories }) => {
        this.totalProducts = products.data.total;
        this.totalCategories = categories.data.total;
        this.outOfStockCount = products.data.items.filter((product) => product.stock === 0).length;
        this.recentProducts = [...products.data.items]
          .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
          .slice(0, 5);
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
