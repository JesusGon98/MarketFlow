import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public form: FormGroup;
  public submitting = false;
  public error = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public get email() {
    return this.form.get('email');
  }

  public get password() {
    return this.form.get('password');
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.error = false;

    this.authService.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/admin/dashboard']);
      },
      error: () => {
        this.submitting = false;
        this.error = true;
      },
    });
  }
}
