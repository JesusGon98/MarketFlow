import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Banner } from '../../core/models/banner.model';
import { Category } from '../../core/models/category.model';
import { Product } from '../../core/models/product.model';
import { Store } from '../../core/models/store.model';
import { BannerService } from '../../core/services/banner.service';
import { CartService } from '../../core/services/cart.service';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';
import { StoreService } from '../../core/services/store.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public store?: Store;
  public banners: Banner[] = [];
  public featuredCategories: Category[] = [];
  public featuredProducts: Product[] = [];
  public loading = true;
  public error = false;

  constructor(
    private readonly storeService: StoreService,
    private readonly bannerService: BannerService,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  public get hasContent(): boolean {
    return this.banners.length > 0 || this.featuredCategories.length > 0 || this.featuredProducts.length > 0;
  }

  ngOnInit(): void {
    forkJoin({
      store: this.storeService.getCurrentStore(),
      banners: this.bannerService.getAll(),
      categories: this.categoryService.getAll({ limit: 4 }),
      products: this.productService.getAll({ limit: 8 }),
    }).subscribe({
      next: ({ store, banners, categories, products }) => {
        this.store = store.data;
        this.banners = banners.data;
        this.featuredCategories = categories.data.items;
        this.featuredProducts = products.data.items;
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

  public onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
