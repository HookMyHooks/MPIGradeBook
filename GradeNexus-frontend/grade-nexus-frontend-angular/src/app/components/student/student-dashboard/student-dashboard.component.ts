import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { GradeService } from '../../../services/grade.service';
import { StudentService } from '../../../services/student.service';
import { SubjectService } from '../../../services/subject.service';
import { TeacherService } from '../../../services/teacher.service';
import { AverageComponent } from '../average/average.component';
import { GradeItemComponent } from '../grade-item/grade-item.component';
import { GradeListComponent } from '../grade-list/grade-list.component';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    GradeListComponent,
    GradeItemComponent,
    AverageComponent,
    FormsModule,
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
})
export class StudentDashboardComponent implements OnInit {
  grades: { subject: string; value: number; date: Date; teacher: string }[] =
    [];
  recentGrades = [
    {
      subject: 'Matematică',
      value: 9,
      date: new Date('2025-03-21'),
    },
    {
      subject: 'Română',
      value: 10,
      date: new Date('2025-03-20'),
    },
  ];
  selectedGradeIndex: number | null = null;

  subjects: string[] = [];
  selectedSubject: string | null = null;

  currentView: 'overview' | 'allGrades' | 'gradesPerSubject' = 'overview';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly gradeService: GradeService,
    private readonly subjectService: SubjectService,
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId()!;

    forkJoin({
      grades: this.gradeService.getAllGrades(),
      student: this.studentService.getStudentByUserId(userId),
      subjects: this.subjectService.getAllSubjects(),
    }).subscribe({
      next: ({ grades, student, subjects }) => {
        this.subjects = subjects.map((s) => s.name);

        const teacherIds = Array.from(
          new Set(subjects.map((s) => s.teacherId))
        );

        const teacherRequests = teacherIds.map((id) =>
          this.teacherService.getTeacherById(id)
        );

        forkJoin(teacherRequests).subscribe((teachers) => {
          this.grades = grades.map((g) => {
            const subj = subjects.find((s) => s.id === g.subjectId);
            const teacher = teachers.find((t) => t.id === subj?.teacherId);
            return {
              student: `${student.firstName} ${student.lastName}`,
              subject: subj?.name ?? 'N/A',
              value: g.value,
              date: new Date(g.date!),
              teacher: teacher
                ? `${teacher.firstName} ${teacher.lastName}`
                : 'N/A',
            };
          });
          const sortedGrades = [...this.grades].sort(
            (a, b) => b.date.getTime() - a.date.getTime()
          );
          this.recentGrades = sortedGrades.slice(0, 3);
        });
      },
      error: (err) => console.error('Eroare la încărcare grade info:', err),
    });
  }

  setView(view: 'overview' | 'allGrades' | 'gradesPerSubject') {
    this.currentView = view;
    this.selectedGradeIndex = null;
  }

  selectGrade(index: number) {
    if (this.selectedGradeIndex === index) {
      this.selectedGradeIndex = null;
    } else {
      this.selectedGradeIndex = index;
    }
  }

  clearSelection() {
    this.selectedGradeIndex = null;
  }

  getGradesForSelectedSubject() {
    if (!this.selectedSubject) return [];
    return this.grades.filter((g) => g.subject === this.selectedSubject);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
