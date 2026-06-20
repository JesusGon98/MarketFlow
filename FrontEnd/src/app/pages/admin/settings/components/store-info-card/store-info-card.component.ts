import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-store-info-card',
  standalone: false,
  templateUrl: './store-info-card.component.html',
  styleUrl: './store-info-card.component.scss',
})
export class StoreInfoCardComponent implements OnInit {
  @Input() storeName = '';
  @Input() storeLogoUrl = '';

  @Output() saved = new EventEmitter<{ name: string; logoUrl: string }>();

  public editedName = '';
  public editedLogoUrl = '';

  ngOnInit(): void {
    this.editedName = this.storeName;
    this.editedLogoUrl = this.storeLogoUrl;
  }

  public onSave(): void {
    this.saved.emit({ name: this.editedName, logoUrl: this.editedLogoUrl });
  }
}
