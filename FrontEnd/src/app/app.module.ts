import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';

import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SettingsComponent } from './pages/admin/settings/settings.component';
import { SettingsSectionComponent } from './pages/admin/settings/components/settings-section/settings-section.component';
import { ToggleOptionComponent } from './pages/admin/settings/components/toggle-option/toggle-option.component';
import { StoreInfoCardComponent } from './pages/admin/settings/components/store-info-card/store-info-card.component';
import { AdminProductListComponent } from './pages/admin/products/product-list/product-list.component';
import { AdminProductFormComponent } from './pages/admin/products/product-form/product-form.component';
import { AdminCategoryListComponent } from './pages/admin/categories/category-list/category-list.component';
import { AdminCategoryFormComponent } from './pages/admin/categories/category-form/category-form.component';
import { AdminBannerListComponent } from './pages/admin/banners/banner-list/banner-list.component';
import { AdminBannerFormComponent } from './pages/admin/banners/banner-form/banner-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailComponent,
    CategoriesComponent,
    CartComponent,
    ContactComponent,
    LoginComponent,
    NotFoundComponent,
    DashboardComponent,
    SettingsComponent,
    SettingsSectionComponent,
    ToggleOptionComponent,
    StoreInfoCardComponent,
    AdminProductListComponent,
    AdminProductFormComponent,
    AdminCategoryListComponent,
    AdminCategoryFormComponent,
    AdminBannerListComponent,
    AdminBannerFormComponent,
  ],
  imports: [BrowserModule, LayoutModule, SharedModule, AppRoutingModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
