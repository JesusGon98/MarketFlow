import { Component, OnInit } from '@angular/core';
import { Banner } from '../../../../core/models/banner.model';
import { BannerService } from '../../../../core/services/banner.service';

@Component({
  selector: 'app-admin-banner-list',
  standalone: false,
  templateUrl: './banner-list.component.html',
  styleUrl: './banner-list.component.scss',
})
export class AdminBannerListComponent implements OnInit {
  public banners: Banner[] = [];
  public loading = true;
  public error = false;
  public bannerToDelete?: Banner;

  constructor(private readonly bannerService: BannerService) {}

  ngOnInit(): void {
    this.loadBanners();
  }

  public confirmDelete(banner: Banner): void {
    this.bannerToDelete = banner;
  }

  public cancelDelete(): void {
    this.bannerToDelete = undefined;
  }

  public deleteBanner(): void {
    if (!this.bannerToDelete) return;

    this.bannerService.delete(this.bannerToDelete.id).subscribe({
      next: () => {
        this.bannerToDelete = undefined;
        this.loadBanners();
      },
      error: () => {
        this.bannerToDelete = undefined;
        this.error = true;
      },
    });
  }

  private loadBanners(): void {
    this.loading = true;

    this.bannerService.getAll().subscribe({
      next: (response) => {
        this.banners = response.data.sort((a, b) => a.displayOrder - b.displayOrder);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }
}
