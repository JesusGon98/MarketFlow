import { Component, Input } from '@angular/core';
import { Banner } from '../../../core/models/banner.model';

@Component({
  selector: 'app-banner-carousel',
  standalone: false,
  templateUrl: './banner-carousel.component.html',
  styleUrl: './banner-carousel.component.scss',
})
export class BannerCarouselComponent {
  @Input() banners: Banner[] = [];
}
