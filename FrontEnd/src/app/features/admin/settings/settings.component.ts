import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '../../../core/models/store.model';
import { StoreService } from '../../../core/services/store.service';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  public form: FormGroup;
  public loading = true;
  public saving = false;
  public saved = false;
  public error = false;
  private storeId = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly storeService: StoreService,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      phone: [''],
      email: ['', [Validators.email]],
      address: [''],
      schedule: [''],
      logoUrl: [''],
      primaryColor: ['#0d6efd'],
      secondaryColor: ['#6c757d'],
      facebookUrl: [''],
      instagramUrl: [''],
      tiktokUrl: [''],
      whatsappUrl: [''],
    });
  }

  ngOnInit(): void {
    this.storeService.getCurrentStore().subscribe({
      next: (response) => {
        const store: Store = response.data;
        this.storeId = store.id;
        this.form.patchValue(store);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.saved = false;

    this.storeService.update(this.storeId, this.form.getRawValue()).subscribe({
      next: () => {
        this.saving = false;
        this.saved = true;
      },
      error: () => {
        this.saving = false;
        this.error = true;
      },
    });
  }
}
