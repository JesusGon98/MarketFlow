import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: false,
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  @Input() title = 'Confirmar acción';
  @Input() message = '¿Estás seguro de que deseas continuar?';
  @Input() visible = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  public onConfirm(): void {
    this.confirm.emit();
  }

  public onCancel(): void {
    this.cancel.emit();
  }
}
