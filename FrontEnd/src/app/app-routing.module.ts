import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SettingsComponent } from './pages/admin/settings/settings.component';
import { AdminProductListComponent } from './pages/admin/products/product-list/product-list.component';
import { AdminProductFormComponent } from './pages/admin/products/product-form/product-form.component';
import { AdminCategoryListComponent } from './pages/admin/categories/category-list/category-list.component';
import { AdminCategoryFormComponent } from './pages/admin/categories/category-form/category-form.component';
import { AdminBannerListComponent } from './pages/admin/banners/banner-list/banner-list.component';
import { AdminBannerFormComponent } from './pages/admin/banners/banner-form/banner-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'cart', component: CartComponent },
      { path: 'contact', component: ContactComponent },
    ],
  },
  {
    path: 'admin/login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: AdminProductListComponent },
      { path: 'products/new', component: AdminProductFormComponent },
      { path: 'products/:id/edit', component: AdminProductFormComponent },
      { path: 'categories', component: AdminCategoryListComponent },
      { path: 'categories/new', component: AdminCategoryFormComponent },
      { path: 'categories/:id/edit', component: AdminCategoryFormComponent },
      { path: 'banners', component: AdminBannerListComponent },
      { path: 'banners/new', component: AdminBannerFormComponent },
      { path: 'banners/:id/edit', component: AdminBannerFormComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
