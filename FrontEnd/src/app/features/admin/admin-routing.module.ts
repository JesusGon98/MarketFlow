import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: 'banners',
    loadChildren: () => import('./banners/banners.module').then((m) => m.BannersModule),
  },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
