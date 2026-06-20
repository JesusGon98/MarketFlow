import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: false,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  @Input() public variant: 'primary' | 'secondary' | 'warning' | 'success' | 'danger' = 'primary';

  get classes(): string {
    return `badge bg-${this.variant}`;
  }
}
