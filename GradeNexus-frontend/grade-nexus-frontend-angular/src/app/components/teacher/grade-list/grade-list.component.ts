import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class GradeListComponent {
  grades: { subject: string; student: string; value: number; date: Date }[] = [
    { subject: 'Matematică', student: 'Bianca Nechita', value: 9, date: new Date('2025-03-20') },
    { subject: 'Română', student: 'Andrei Popescu', value: 10, date: new Date('2025-03-21') }
  ];

  editGrade(index: number, newValue: number) {
    if (newValue >= 1 && newValue <= 10) {
      this.grades[index].value = newValue;
    }
  }

  deleteGrade(index: number) {
    this.grades.splice(index, 1);
  }
}
