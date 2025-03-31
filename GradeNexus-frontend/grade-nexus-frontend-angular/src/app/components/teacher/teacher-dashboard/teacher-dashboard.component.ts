import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class TeacherDashboardComponent {
  grades: { subject: string; student: string; value: number; date: Date }[] = [
    { subject: 'Matematică', student: 'Bianca Nechita', value: 9, date: new Date('2025-03-20') },
    { subject: 'Română', student: 'Andrei Popescu', value: 10, date: new Date('2025-03-21') }
  ];

  newGrade = {
    subject: '',
    student: '',
    value: 0
  };

  addGrade() {
    if (this.newGrade.subject && this.newGrade.student && this.newGrade.value > 0) {
      this.grades.push({
        subject: this.newGrade.subject,
        student: this.newGrade.student,
        value: this.newGrade.value,
        date: new Date()
      });

      this.newGrade = {
        subject: '',
        student: '',
        value: 0
      };
    }
  }
}
