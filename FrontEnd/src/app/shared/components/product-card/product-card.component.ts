import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;

  @Output() addToCart = new EventEmitter<Product>();

  public onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
