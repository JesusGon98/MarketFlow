import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-settings-section',
  standalone: false,
  templateUrl: './settings-section.component.html',
  styleUrl: './settings-section.component.scss',
})
export class SettingsSectionComponent {
  @Input() title = '';
  @Input() icon = 'gear';

  @Output() saved = new EventEmitter<void>();

  public onSave(): void {
    this.saved.emit();
  }
}
