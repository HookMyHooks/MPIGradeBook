import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-grade-history',
  templateUrl: './grade-history.component.html',
  styleUrls: ['./grade-history.component.scss'],
  imports: [CommonModule]
})
export class GradeHistoryComponent {
  history: { student: string; subject: string; value: number; date: Date }[] = [
    { student: 'Bianca Nechita', subject: 'Matematică', value: 9, date: new Date('2025-03-20') },
    { student: 'Bianca Nechita', subject: 'Matematică', value: 8, date: new Date('2025-03-18') },
  ];
}
