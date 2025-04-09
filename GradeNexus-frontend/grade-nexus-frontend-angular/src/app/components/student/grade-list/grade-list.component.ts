import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grade-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss'],
})
export class GradeListComponent {
  @Input() grades: { subject: string; teacher: string; value: number; date: Date }[] = [];
}
