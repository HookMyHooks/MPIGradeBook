import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class ResetPasswordComponent {
  resetForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

  onSubmit(): void {
    if (this.resetForm.invalid) return;

    this.isLoading = true;
    const { email, password } = this.resetForm.value;

    this.authService.resetPassword(email!, password!).subscribe({
      next: (success) => {
        this.successMessage = 'Password reset successful.';
        this.errorMessage = '';
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message ?? 'Unexpected error occurred.';
        this.isLoading = false;
      },
    });
  }
}
