import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from '../../../../core/services/banner.service';

@Component({
  selector: 'app-admin-banner-form',
  standalone: false,
  templateUrl: './banner-form.component.html',
  styleUrl: './banner-form.component.scss',
})
export class AdminBannerFormComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public saving = false;
  public error = false;
  public isEditMode = false;
  private bannerId = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly bannerService: BannerService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      imageUrl: ['', Validators.required],
      displayOrder: [0, [Validators.required, Validators.min(0)]],
      active: [true],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.bannerId = id;
      this.loading = true;

      this.bannerService.getById(id).subscribe({
        next: (response) => {
          this.form.patchValue(response.data);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.error = true;
        },
      });
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const value = this.form.getRawValue();

    const request$ = this.isEditMode
      ? this.bannerService.update(this.bannerId, value)
      : this.bannerService.create(value);

    request$.subscribe({
      next: () => this.router.navigate(['/admin/banners']),
      error: () => {
        this.saving = false;
        this.error = true;
      },
    });
  }

  public onCancel(): void {
    this.router.navigate(['/admin/banners']);
  }
}
