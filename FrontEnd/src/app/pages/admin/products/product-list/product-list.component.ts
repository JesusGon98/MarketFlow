import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-admin-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class AdminProductListComponent implements OnInit {
  public products: Product[] = [];
  public loading = true;
  public error = false;
  public productToDelete?: Product;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  public confirmDelete(product: Product): void {
    this.productToDelete = product;
  }

  public cancelDelete(): void {
    this.productToDelete = undefined;
  }

  public deleteProduct(): void {
    if (!this.productToDelete) return;

    this.productService.delete(this.productToDelete.id).subscribe({
      next: () => {
        this.productToDelete = undefined;
        this.loadProducts();
      },
      error: () => {
        this.productToDelete = undefined;
        this.error = true;
      },
    });
  }

  private loadProducts(): void {
    this.loading = true;

    this.productService.getAll({ limit: 100 }).subscribe({
      next: (response) => {
        this.products = response.data.items;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }
}
