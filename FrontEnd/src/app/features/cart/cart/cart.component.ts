import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../../core/models/cart-item.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  public items$: Observable<CartItem[]>;

  constructor(private readonly cartService: CartService) {
    this.items$ = this.cartService.items$;
  }

  public increase(item: CartItem): void {
    this.cartService.updateQuantity(item.product.id, item.quantity + 1);
  }

  public decrease(item: CartItem): void {
    this.cartService.updateQuantity(item.product.id, item.quantity - 1);
  }

  public remove(item: CartItem): void {
    this.cartService.removeItem(item.product.id);
  }

  public clear(): void {
    this.cartService.clear();
  }

  public getTotal(): number {
    return this.cartService.getTotal();
  }
}
