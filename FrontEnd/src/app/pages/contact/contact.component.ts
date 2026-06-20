import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '../../core/models/store.model';
import { StoreService } from '../../core/services/store.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  public store?: Store;
  public loading = true;
  public error = false;

  constructor(
    private readonly storeService: StoreService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.storeService.getCurrentStore().subscribe({
      next: (response) => {
        this.store = response.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.error = true;
        this.cdr.detectChanges();
      },
    });
  }
}
