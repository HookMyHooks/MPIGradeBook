import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
@Component({
  selector: 'app-grade-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss'],
})
export class GradeListComponent {
  title = input<string>('');
  grades = input<
    { subject: string; value: number; date: Date }[]
  >([]);

  gradeClick = output<number>();

  onGradeClick(index: number) {
    this.gradeClick.emit(index);
  }
}
