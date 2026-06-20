import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '../../core/models/store.model';
import { StoreService } from '../../core/services/store.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  public store?: Store;
  public currentYear = new Date().getFullYear();

  constructor(
    private readonly storeService: StoreService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.storeService.getCurrentStore().subscribe({
      next: (response) => {
        this.store = response.data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.store = undefined;
        this.cdr.detectChanges();
      },
    });
  }
}
