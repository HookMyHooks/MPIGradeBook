import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Grade } from '../../../dtos/grade';
import { Student } from '../../../dtos/student';
import { AuthService } from '../../../services/auth.service';
import { GradeService } from '../../../services/grade.service';
import { StudentService } from '../../../services/student.service';
import { SubjectService } from '../../../services/subject.service';
import { GradeHistoryComponent } from '../grade-history/grade-history.component';
import { TeacherGradeItemComponent } from '../grade-item/grade-item.component';
import { TeacherService } from '../../../services/teacher.service';
import { EditGradeDialogComponent } from '../edit-grade-dialog/edit-grade-dialog.component';

@Component({
  selector: 'app-student-grades-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GradeHistoryComponent,
    TeacherGradeItemComponent,
    EditGradeDialogComponent,
  ],
  templateUrl: './student-grades-list.component.html',
  styleUrls: ['./student-grades-list.component.scss'],
})
export class StudentGradesListComponent implements OnInit {
  students: Student[] = [];
  selectedStudentId: number | null = null;

  history: { student: string; subject: string; value: number; date: Date }[] =
    [];
  selectedGradeIndex: number | null = null;
  grades: Grade[] = [];
  showEditDialog = false;

  constructor(
    private readonly authService: AuthService,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
    private readonly gradeService: GradeService,
    private readonly subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe((students) => {
      this.students = students;
    });
  }

  onSelectStudent(): void {
    const teacherUserId = this.authService.getUserId();
    if (!teacherUserId || this.selectedStudentId === null) return;

    this.teacherService
      .getTeacherByUserId(teacherUserId)
      .subscribe((teacher) => {
        this.gradeService.getAllGrades().subscribe((grades) => {
          this.subjectService.getAllSubjects().subscribe((subjects) => {
            const student = this.students.find(
              (s) => s.id === this.selectedStudentId
            );
            const teacherSubjects = subjects.filter(
              (s) => s.teacherId === teacher.id
            );
            const validSubjectIds = teacherSubjects.map((s) => s.id);

            const filteredGrades = grades.filter(
              (g) =>
                g.studentId === this.selectedStudentId &&
                validSubjectIds.includes(g.subjectId)
            );

            this.grades = filteredGrades;
            this.history = filteredGrades.map((g) => {
              const subject = teacherSubjects.find((s) => s.id === g.subjectId);
              return {
                student: `${student?.firstName} ${student?.lastName}`,
                subject: subject?.name ?? 'N/A',
                value: g.value,
                date: new Date(g.date!),
              };
            });

            this.selectedGradeIndex = null;
          });
        });
      });
  }

  selectGrade(index: number) {
    this.selectedGradeIndex = this.selectedGradeIndex === index ? null : index;
  }
  onEditGrade() {
    this.showEditDialog = true;
  }

  onDeleteGrade() {
    if (this.selectedGradeIndex === null) return;

    const grade = this.grades[this.selectedGradeIndex];
    if (!grade?.id) return;

    this.gradeService.deleteGrade(grade.id).subscribe(() => {
      this.grades.splice(this.selectedGradeIndex!, 1);
      this.history.splice(this.selectedGradeIndex!, 1);
      this.selectedGradeIndex = null;
    });
  }

  onSaveEdit(newValue: number) {
    if (this.selectedGradeIndex === null) return;

    const grade = this.grades[this.selectedGradeIndex];
    const updated = { ...grade, value: newValue };

    this.gradeService.updateGrade(updated.id!, updated).subscribe(() => {
      this.grades[this.selectedGradeIndex!] = updated;
      this.history[this.selectedGradeIndex!] = {
        ...this.history[this.selectedGradeIndex!],
        value: newValue,
      };
      this.selectedGradeIndex = null;
      this.showEditDialog = false;
    });
  }

  onCloseEditDialog() {
    this.showEditDialog = false;
  }
}
