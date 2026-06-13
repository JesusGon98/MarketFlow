import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { Store } from '../../core/models/store.model';
import { StoreService } from '../../core/services/store.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  public store?: Store;
  public cartItemsCount$: Observable<number>;

  constructor(
    private readonly storeService: StoreService,
    private readonly cartService: CartService,
  ) {
    this.cartItemsCount$ = this.cartService.items$.pipe(
      map((items) => items.reduce((total, item) => total + item.quantity, 0)),
    );
  }

  ngOnInit(): void {
    this.storeService.getCurrentStore().subscribe({
      next: (response) => (this.store = response.data),
      error: () => (this.store = undefined),
    });
  }
}
