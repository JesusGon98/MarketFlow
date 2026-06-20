import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-option',
  standalone: false,
  templateUrl: './toggle-option.component.html',
  styleUrl: './toggle-option.component.scss',
})
export class ToggleOptionComponent {
  @Input() label = '';
  @Input() description = '';
  @Input() checked = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  public onToggle(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.checkedChange.emit(checked);
  }
}
