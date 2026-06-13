import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'products',
        loadChildren: () => import('./features/products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'categories',
        loadChildren: () => import('./features/categories/categories.module').then((m) => m.CategoriesModule),
      },
      {
        path: 'cart',
        loadChildren: () => import('./features/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'contact',
        loadChildren: () => import('./features/contact/contact.module').then((m) => m.ContactModule),
      },
    ],
  },
  {
    path: 'admin/login',
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
