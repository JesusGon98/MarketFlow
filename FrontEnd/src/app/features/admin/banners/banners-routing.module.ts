import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerFormComponent } from './banner-form/banner-form.component';
import { BannerListComponent } from './banner-list/banner-list.component';

const routes: Routes = [
  { path: '', component: BannerListComponent },
  { path: 'new', component: BannerFormComponent },
  { path: ':id/edit', component: BannerFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BannersRoutingModule {}
