import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Grade } from '../../../dtos/grade';
import { Student } from '../../../dtos/student';
import { Subject } from '../../../dtos/subject';
import { AuthService } from '../../../services/auth.service';
import { GradeService } from '../../../services/grade.service';
import { StudentService } from '../../../services/student.service';
import { SubjectService } from '../../../services/subject.service';
import { TeacherService } from '../../../services/teacher.service';
import { AddGradeComponent } from '../add-grade/add-grade.component';
import { BulkUploadComponent } from '../bulk-upload/bulk-upload.component';
import { EditGradeDialogComponent } from '../edit-grade-dialog/edit-grade-dialog.component';
import { GradeHistoryComponent } from '../grade-history/grade-history.component';
import { TeacherGradeItemComponent } from '../grade-item/grade-item.component';
import { StudentGradesListComponent } from '../student-grades-list/student-grades-list.component';

@Component({
  standalone: true,
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss'],
  imports: [
    CommonModule,
    AddGradeComponent,
    StudentGradesListComponent,
    GradeHistoryComponent,
    BulkUploadComponent,
    TeacherGradeItemComponent,
    EditGradeDialogComponent,
  ],
})
export class TeacherDashboardComponent implements OnInit {
  history: { student: string; subject: string; value: number; date: Date }[] =
    [];
  grades: Grade[] = [];
  subjects: Subject[] = [];
  students: Student[] = [];

  currentView: 'add' | 'list' | 'history' | 'bulk' = 'add';
  selectedGradeIndex: number | null = null;
  showEditDialog = false;

  constructor(
    private readonly authService: AuthService,
    private readonly gradeService: GradeService,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
    private readonly subjectService: SubjectService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId()!;

    forkJoin({
      grades: this.gradeService.getAllGrades(),
      students: this.studentService.getAllStudents(),
      subjects: this.subjectService.getAllSubjects(),
      teacher: this.teacherService.getTeacherByUserId(userId),
    }).subscribe({
      next: ({ grades, students, subjects, teacher }) => {
        this.students = students;

        const teacherSubjects = subjects.filter(
          (subject) => subject.teacherId === teacher.id
        );
        this.subjects = teacherSubjects;

        const filteredGrades = grades.filter((grade) =>
          teacherSubjects.some((subject) => subject.id === grade.subjectId)
        );
        this.grades = filteredGrades;

        this.history = filteredGrades.map((grade) => {
          const student = students.find((s) => s.id === grade.studentId);
          const subject = teacherSubjects.find((s) => s.id === grade.subjectId);
          return {
            student: student
              ? `${student.firstName} ${student.lastName}`
              : 'Error',
            subject: subject ? subject.name : 'N/A',
            value: grade.value,
            date: new Date(grade.date!),
          };
        });
      },
    });
  }

  setView(view: 'add' | 'list' | 'history' | 'bulk') {
    this.currentView = view;
  }

  selectGrade(index: number) {
    if (this.selectedGradeIndex === index) {
      this.selectedGradeIndex = null;
    } else {
      this.selectedGradeIndex = index;
    }
    console.log(this.selectedGradeIndex);
  }

  onDeleteGrade() {
    if (this.selectedGradeIndex === null) return;

    const gradeToDelete = this.grades[this.selectedGradeIndex];

    if (!gradeToDelete || !gradeToDelete.id) {
      return;
    }

    this.gradeService.deleteGrade(gradeToDelete.id).subscribe({
      next: () => {
        this.grades.splice(this.selectedGradeIndex!, 1);
        this.history.splice(this.selectedGradeIndex!, 1);

        this.selectedGradeIndex = null;
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onEditGrade() {
    this.showEditDialog = true;
  }

  onCloseEditDialog() {
    this.showEditDialog = false;
  }

  onSaveEdit(newValue: number) {
    const grade = this.grades[this.selectedGradeIndex!];
    const updated = { ...grade, value: newValue };

    this.gradeService.updateGrade(updated.id!, updated).subscribe({
      next: () => {
        this.grades[this.selectedGradeIndex!] = updated;
        this.history[this.selectedGradeIndex!] = {
          ...this.history[this.selectedGradeIndex!],
          value: newValue,
        };
        this.selectedGradeIndex = null;
        this.showEditDialog = false;
      },
    });
  }
}
