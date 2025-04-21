import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../../../dtos/student';
import { Subject } from '../../../dtos/subject';
import { AuthService } from '../../../services/auth.service';
import { GradeService } from '../../../services/grade.service';
import { StudentService } from '../../../services/student.service';
import { SubjectService } from '../../../services/subject.service';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  standalone: true,
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class AddGradeComponent implements OnInit {
  subjects: Subject[] = [];
  students: Student[] = [];

  newGrade = {
    subjectId: null as unknown as number,
    studentId: null as unknown as number,
    value: 0,
  };

  grades: {
    subjectName: string;
    studentName: string;
    value: number;
  }[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly gradeService: GradeService,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
    private readonly subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.loadStudents();
    this.loadSubjects();
  }

  loadStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (data) => (this.students = data),
    });
  }

  loadSubjects() {
    const userId = this.authService.getUserId()!;

    this.teacherService.getTeacherByUserId(userId).subscribe({
      next: (teacher) => {
        this.subjectService.getAllSubjects().subscribe({
          next: (subjects) => {
            this.subjects = subjects.filter(
              (subject) => subject.teacherId === teacher.id
            );
          },
        });
      },
    });
  }

  addGrade() {
    if (this.newGrade.studentId !== null && this.newGrade.subjectId !== null) {
      const student = this.students.find(
        (student) => student.id === this.newGrade.studentId
      );

      const subject = this.subjects.find(
        (subject) => subject.id === this.newGrade.subjectId
      );

      this.gradeService
        .addGrade({
          studentId: this.newGrade.studentId,
          subjectId: this.newGrade.subjectId,
          value: this.newGrade.value,
        })
        .subscribe(() => {
          this.grades.push({
            subjectName: subject?.name ?? '',
            studentName: student?.firstName + ' ' + student?.lastName || '',
            value: this.newGrade.value,
          });
        });
    }
  }
}
