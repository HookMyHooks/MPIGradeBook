import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-class-management',
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ClassManagementComponent {
  students: string[] = ['Bianca Nechita', 'Andrei Popescu'];
  newStudent = '';

  addStudent() {
    const trimmed = this.newStudent.trim();
    if (trimmed && !this.students.includes(trimmed)) {
      this.students.push(trimmed);
      this.newStudent = '';
    }
  }

  removeStudent(index: number) {
    this.students.splice(index, 1);
  }
}
