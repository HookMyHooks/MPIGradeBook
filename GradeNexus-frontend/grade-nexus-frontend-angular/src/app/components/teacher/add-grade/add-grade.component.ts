import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class AddGradeComponent {
  newGrade = {
    subject: '',
    student: '',
    value: 0
  };

  grades: { subject: string; student: string; value: number; date: Date }[] = [];

  addGrade() {
    if (
      this.newGrade.subject &&
      this.newGrade.student &&
      this.newGrade.value >= 1 &&
      this.newGrade.value <= 10
    ) {
      this.grades.push({
        subject: this.newGrade.subject,
        student: this.newGrade.student,
        value: this.newGrade.value,
        date: new Date()
      });
      this.newGrade = { subject: '', student: '', value: 0 };
    }
  }

  uploadBulkGrades(file: File) {
    // TODO: Implement CSV bulk upload
  }
}
