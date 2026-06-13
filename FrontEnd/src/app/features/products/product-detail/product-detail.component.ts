import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  public product?: Product;
  public quantity = 1;
  public loading = true;
  public error = false;
  public addedToCart = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly cartService: CartService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.productService.getById(id).subscribe({
      next: (response) => {
        this.product = response.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  public increaseQuantity(): void {
    if (!this.product || this.quantity >= this.product.stock) return;
    this.quantity++;
  }

  public decreaseQuantity(): void {
    if (this.quantity <= 1) return;
    this.quantity--;
  }

  public addToCart(): void {
    if (!this.product) return;

    this.cartService.addToCart(this.product, this.quantity);
    this.addedToCart = true;
  }
}
