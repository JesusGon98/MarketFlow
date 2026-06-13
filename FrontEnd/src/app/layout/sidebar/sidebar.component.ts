import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface SidebarLink {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public readonly links: SidebarLink[] = [
    { label: 'Dashboard', route: '/admin/dashboard', icon: 'bi-speedometer2' },
    { label: 'Productos', route: '/admin/products', icon: 'bi-box-seam' },
    { label: 'Categorías', route: '/admin/categories', icon: 'bi-tags' },
    { label: 'Banners', route: '/admin/banners', icon: 'bi-images' },
    { label: 'Configuración', route: '/admin/settings', icon: 'bi-gear' },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
