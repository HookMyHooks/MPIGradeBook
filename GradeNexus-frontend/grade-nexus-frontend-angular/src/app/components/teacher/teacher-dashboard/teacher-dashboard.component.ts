import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddGradeComponent } from '../add-grade/add-grade.component';
import { GradeListComponent } from '../grade-list/grade-list.component';
import { GradeHistoryComponent } from '../grade-history/grade-history.component';
import { ClassManagementComponent } from '../class-management/class-management.component';

@Component({
  standalone: true,
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss'],
  imports: [CommonModule, AddGradeComponent, GradeListComponent, GradeHistoryComponent, ClassManagementComponent],
})
export class TeacherDashboardComponent {
  currentView: 'add' | 'list' | 'history' | 'class' = 'add';

  setView(view: 'add' | 'list' | 'history' | 'class') {
    this.currentView = view;
  }
}

