import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    PublicLayoutComponent,
    AdminLayoutComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [PublicLayoutComponent, AdminLayoutComponent],
})
export class LayoutModule {}
