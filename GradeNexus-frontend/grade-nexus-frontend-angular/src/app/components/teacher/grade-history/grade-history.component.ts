import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Grade } from '../../../dtos/grade';
import { Student } from '../../../dtos/student';
import { Subject } from '../../../dtos/subject';
import { GradeService } from '../../../services/grade.service';
import { StudentService } from '../../../services/student.service';
import { SubjectService } from '../../../services/subject.service';

@Component({
  standalone: true,
  selector: 'app-grade-history',
  templateUrl: './grade-history.component.html',
  styleUrls: ['./grade-history.component.scss'],
  imports: [CommonModule],
})
export class GradeHistoryComponent implements OnInit {
  history: { student: string; subject: string; value: number; date: Date }[] =
    [];
  grades: Grade[] = [];
  subjects: Subject[] = [];
  students: Student[] = [];

  constructor(
    private readonly gradeService: GradeService,
    private readonly studentService: StudentService,
    private readonly subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    forkJoin({
      grades: this.gradeService.getAllGrades(),
      students: this.studentService.getAllStudents(),
      subjects: this.subjectService.getAllSubjects(),
    }).subscribe({
      next: ({ grades, students, subjects }) => {
        this.grades = grades;
        this.students = students;
        this.subjects = subjects;

        this.history = grades.map((g) => {
          const stud = students.find((s) => s.id === g.studentId);
          const subj = subjects.find((s) => s.id === g.subjectId);
          return {
            student: stud ? `${stud.firstName} ${stud.lastName}` : 'Error',
            subject: subj ? subj.name : 'N/A',
            value: g.value,
            date: new Date(g.date!),
          };
        });
      },
    });
  }
}
