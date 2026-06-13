import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-box',
  standalone: false,
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
})
export class SearchBoxComponent implements OnDestroy {
  @Input() placeholder = 'Buscar...';

  @Output() search = new EventEmitter<string>();

  public readonly searchControl = new FormControl('', { nonNullable: true });

  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.searchControl.valueChanges.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe((value) => {
      this.search.emit(value.trim());
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
