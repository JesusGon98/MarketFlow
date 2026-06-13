import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannersRoutingModule } from './banners-routing.module';
import { BannerListComponent } from './banner-list/banner-list.component';
import { BannerFormComponent } from './banner-form/banner-form.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [BannerListComponent, BannerFormComponent],
  imports: [CommonModule, SharedModule, BannersRoutingModule],
})
export class BannersModule {}
