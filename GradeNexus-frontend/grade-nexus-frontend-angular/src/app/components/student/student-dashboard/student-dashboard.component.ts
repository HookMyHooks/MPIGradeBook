import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent {
  grades = [
    { subject: 'Matematică', teacher: 'Prof. Alistar', value: 9, date: new Date('2025-03-21') },
    { subject: 'Română', teacher: 'Prof. Bichir', value: 10, date: new Date('2025-03-20') },
    { subject: 'Istorie', teacher: 'Prof. Chelaru', value: 8, date: new Date('2025-03-15') }
  ];
}