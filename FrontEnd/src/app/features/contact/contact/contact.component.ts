import { Component, OnInit } from '@angular/core';
import { Store } from '../../../core/models/store.model';
import { StoreService } from '../../../core/services/store.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  public store?: Store;
  public loading = true;

  constructor(private readonly storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getCurrentStore().subscribe({
      next: (response) => {
        this.store = response.data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
