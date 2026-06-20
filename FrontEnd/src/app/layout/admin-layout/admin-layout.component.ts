import { Component, ElementRef, HostListener } from '@angular/core';

declare const bootstrap: any;

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  public closeMobileSidebar(): void {
    const offcanvasEl = this.elementRef.nativeElement.querySelector<HTMLElement>('#adminSidebar');
    if (!offcanvasEl) return;

    bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl).hide();
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    const offcanvasEl = this.elementRef.nativeElement.querySelector<HTMLElement>('#adminSidebar');
    if (!offcanvasEl || !offcanvasEl.classList.contains('show')) return;

    const toggleButton = this.elementRef.nativeElement.querySelector('[data-bs-toggle="offcanvas"]');
    const target = event.target as Node;
    if (offcanvasEl.contains(target) || toggleButton?.contains(target)) return;

    bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl).hide();
  }
}
