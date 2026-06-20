import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  standalone: false,
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.scss',
})
export class ImageModalComponent {
  @Input() title = '';
  @Input() src = '';
  @Input() visible = false;

  @Output() closed = new EventEmitter<void>();

  public close(): void {
    this.closed.emit();
  }
}
