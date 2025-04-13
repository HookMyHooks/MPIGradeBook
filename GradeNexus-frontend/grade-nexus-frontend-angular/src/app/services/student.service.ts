import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../dtos/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly baseUrl = 'http://localhost:8080/students';

  constructor(private readonly http: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }
}
