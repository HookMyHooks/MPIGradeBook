import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Grade } from '../../../dtos/grade';

@Component({
  standalone: true,
  selector: 'app-edit-grade-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-grade-dialog.component.html',
  styleUrls: ['./edit-grade-dialog.component.scss'],
})
export class EditGradeDialogComponent {
  @Input() grade!: Grade;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<number>();

  newValue: number = 0;

  ngOnInit() {
    this.newValue = this.grade.value;
  }

  saveEdit() {
    this.save.emit(this.newValue);
  }

  closeDialog() {
    this.close.emit();
  }
}
