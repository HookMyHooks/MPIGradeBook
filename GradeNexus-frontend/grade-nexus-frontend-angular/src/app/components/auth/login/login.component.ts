import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StudentService } from '../../../services/student.service';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        if (this.authService.isStudent()) {
          this.studentService
            .getStudentByUserId(this.authService.getUserId()!)
            .subscribe((studentDetails) => {
              localStorage.setItem(
                'userDetails',
                JSON.stringify({
                  firstName: studentDetails.firstName,
                  lastName: studentDetails.lastName,
                })
              );
            });
          this.router.navigate(['/student-dashboard']);
        } else if (this.authService.isTeacher()) {
          this.teacherService
            .getTeacherByUserId(this.authService.getUserId()!)
            .subscribe((teacherDetails) => {
              localStorage.setItem(
                'userDetails',
                JSON.stringify({
                  firstName: teacherDetails.firstName,
                  lastName: teacherDetails.lastName,
                })
              );
            });
          this.router.navigate(['/teacher-dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message ?? 'Login failed. Please try again.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
