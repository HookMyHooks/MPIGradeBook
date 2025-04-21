import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-grade-history',
  templateUrl: './grade-history.component.html',
  styleUrls: ['./grade-history.component.scss'],
  imports: [CommonModule],
})
export class GradeHistoryComponent {
  history = input<
    { student: string; subject: string; value: number; date: Date }[]
  >([]);

  gradeClick = output<number>();

  onGradeClick(index: number) {
    this.gradeClick.emit(index);
  }
}
