import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bulk-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bulk-upload.component.html',
})
export class BulkUploadComponent {
  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const lines = text.trim().split('\n').slice(1); 

      const grades = lines.map(line => {
        const [studentId, subjectId, value] = line.split(',');
        return {
          studentId: parseInt(studentId),
          subjectId: parseInt(subjectId),
          value: parseInt(value)
        };
      });

      this.http.post('http://localhost:8189/api/grades/bulk', grades)
        .subscribe({
          next: () => alert('✅ Upload reușit!'),
          error: () => alert('❌ Upload eșuat!')
        });
    };

    reader.readAsText(file);
  }
}
