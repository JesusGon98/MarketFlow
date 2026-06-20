import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { Store } from '../../core/models/store.model';
import { StoreService } from '../../core/services/store.service';

declare const bootstrap: any;

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
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.cartItemsCount$ = this.cartService.items$.pipe(
      map((items) => items.reduce((total, item) => total + item.quantity, 0)),
    );
  }

  ngOnInit(): void {
    this.storeService.getCurrentStore().subscribe({
      next: (response) => {
        this.store = response.data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.store = undefined;
        this.cdr.detectChanges();
      },
    });
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    const collapseEl = this.elementRef.nativeElement.querySelector<HTMLElement>('#mainNavbar');
    if (!collapseEl || !collapseEl.classList.contains('show')) return;
    if (this.elementRef.nativeElement.contains(event.target as Node)) return;

    bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
  }
}
