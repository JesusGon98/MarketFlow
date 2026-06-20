import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Category } from '../../core/models/category.model';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public categories: Category[] = [];
  public selectedCategoryId = '';
  public searchTerm = '';
  public loading = true;
  public error = false;

  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly cartService: CartService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedCategoryId = params['categoryId'] ?? '';
      this.loadData();
    });
  }

  public onSearch(term: string): void {
    this.searchTerm = term;
    this.loadData();
  }

  public onCategoryChange(categoryId: string): void {
    this.selectedCategoryId = categoryId;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { categoryId: categoryId || null },
      queryParamsHandling: 'merge',
    });
  }

  public onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  private loadData(): void {
    this.loading = true;

    forkJoin({
      products: this.productService.getAll({
        search: this.searchTerm || undefined,
        categoryId: this.selectedCategoryId || undefined,
      }),
      categories: this.categoryService.getAll(),
    }).subscribe({
      next: ({ products, categories }) => {
        this.products = products.data.items;
        this.categories = categories.data.items;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }
}
