import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GradeService } from '../../../services/grade.service';

@Component({
  selector: 'app-bulk-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss'],
})
export class BulkUploadComponent {
  constructor(
    private readonly gradeService: GradeService,
    private readonly snackBar: MatSnackBar
  ) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const lines = text.trim().split('\n').slice(1);

      const grades = lines.map((line) => {
        const [studentId, subjectId, value] = line.split(',');
        return {
          studentId: parseInt(studentId),
          subjectId: parseInt(subjectId),
          value: parseInt(value),
        };
      });

      this.gradeService.uploadBulkGrades(grades).subscribe({
        next: () => {
          this.snackBar.open('Bulk upload completed successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-toast'],
          });
        },
        error: (err: HttpErrorResponse) => {
          const errorMessage =
            typeof err.error === 'string' && err.error.trim().length > 0
              ? err.error
              : 'Bulk upload failed. Please try again.';
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
            panelClass: ['error-toast'],
          });
        },
      });
    };
    reader.readAsText(file);
  }
}
