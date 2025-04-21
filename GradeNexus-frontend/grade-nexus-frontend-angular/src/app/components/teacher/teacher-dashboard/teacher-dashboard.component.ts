import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGradeComponent } from '../add-grade/add-grade.component';
import { GradeListComponent } from '../grade-list/grade-list.component';
import { GradeHistoryComponent } from '../grade-history/grade-history.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { BulkUploadComponent } from '../bulk-upload/bulk-upload.component';

@Component({
  standalone: true,
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss'],
  imports: [
    CommonModule,
    AddGradeComponent,
    GradeListComponent,
    GradeHistoryComponent,
    BulkUploadComponent,
  ],
})
export class TeacherDashboardComponent {
  currentView: 'add' | 'list' | 'history' | 'bulk' = 'add';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  setView(view: 'add' | 'list' | 'history' | 'bulk') {
    this.currentView = view;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
