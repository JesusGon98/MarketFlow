import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-category-card',
  standalone: false,
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  @Input() category!: Category;

  @Output() select = new EventEmitter<Category>();

  public onSelect(): void {
    this.select.emit(this.category);
  }
}
