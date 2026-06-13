import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CategoryListComponent],
  imports: [CommonModule, SharedModule, CategoriesRoutingModule],
})
export class CategoriesModule {}
