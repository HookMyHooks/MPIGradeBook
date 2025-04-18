import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeListComponent } from '../grade-list/grade-list.component';
import { GradeItemComponent } from '../grade-item/grade-item.component';
import { AverageComponent } from '../average/average.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    GradeListComponent,
    GradeItemComponent,
    AverageComponent,
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
})
export class StudentDashboardComponent {
  grades = [
    {
      subject: 'Matematică',
      teacher: 'Prof. Alistar',
      value: 9,
      date: new Date('2025-03-21'),
    },
    {
      subject: 'Română',
      teacher: 'Prof. Bichir',
      value: 10,
      date: new Date('2025-03-20'),
    },
    {
      subject: 'Istorie',
      teacher: 'Prof. Chelaru',
      value: 8,
      date: new Date('2025-03-15'),
    },
  ];
  selectedGradeIndex: number | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  selectGrade(index: number) {
    this.selectedGradeIndex = index;
  }

  clearSelection() {
    this.selectedGradeIndex = null;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
