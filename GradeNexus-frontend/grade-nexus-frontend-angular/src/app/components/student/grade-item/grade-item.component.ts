import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'student-grade-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grade-item.component.html',
  styleUrls: ['./grade-item.component.scss'],
})
export class GradeItemComponent {
  @Input() grade: { subject: string; teacher: string; value: number; date: Date } | null = null;
}
