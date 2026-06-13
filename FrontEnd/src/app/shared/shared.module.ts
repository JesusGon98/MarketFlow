import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { BannerCarouselComponent } from './components/banner-carousel/banner-carousel.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CurrencyMxnPipe } from './pipes/currency-mxn.pipe';

@NgModule({
  declarations: [
    ProductCardComponent,
    CategoryCardComponent,
    BannerCarouselComponent,
    SearchBoxComponent,
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    CurrencyMxnPipe,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ProductCardComponent,
    CategoryCardComponent,
    BannerCarouselComponent,
    SearchBoxComponent,
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    CurrencyMxnPipe,
  ],
})
export class SharedModule {}
