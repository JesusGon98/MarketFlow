import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

const CART_STORAGE_KEY = 'pp-cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  public readonly items$: Observable<CartItem[]> = this.itemsSubject.asObservable();

  public getItems(): CartItem[] {
    return this.itemsSubject.value;
  }

  public addToCart(product: Product, quantity: number = 1): void {
    const items = [...this.itemsSubject.value];
    const existing = items.find((item) => item.product.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ product, quantity });
    }

    this.updateCart(items);
  }

  public updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const items = this.itemsSubject.value.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item,
    );

    this.updateCart(items);
  }

  public removeItem(productId: string): void {
    const items = this.itemsSubject.value.filter((item) => item.product.id !== productId);
    this.updateCart(items);
  }

  public clear(): void {
    this.updateCart([]);
  }

  public getTotal(): number {
    return this.itemsSubject.value.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  public getTotalItems(): number {
    return this.itemsSubject.value.reduce((total, item) => total + item.quantity, 0);
  }

  private updateCart(items: CartItem[]): void {
    this.itemsSubject.next(items);
    this.saveToStorage(items);
  }

  private loadFromStorage(): CartItem[] {
    if (typeof localStorage === 'undefined') return [];

    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  }

  private saveToStorage(items: CartItem[]): void {
    if (typeof localStorage === 'undefined') return;

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }
}
