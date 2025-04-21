import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'teacher-grade-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grade-item.component.html',
  styleUrls: ['./grade-item.component.scss'],
})
export class TeacherGradeItemComponent {
  @Input() grade: { subject: string; value: number; date: Date } | null = null;

  edit = output<void>();
  delete = output<void>();

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
