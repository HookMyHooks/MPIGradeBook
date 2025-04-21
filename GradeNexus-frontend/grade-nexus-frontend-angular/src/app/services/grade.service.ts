import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grade } from '../dtos/grade';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  private readonly baseUrl = 'http://localhost:8189/api/grades';

  constructor(private readonly http: HttpClient) {}

  getAllGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.baseUrl);
  }

  getGradeById(id: number): Observable<Grade> {
    return this.http.get<Grade>(`${this.baseUrl}/${id}`);
  }

  addGrade(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(this.baseUrl, grade);
  }

  updateGrade(id: number, grade: Grade): Observable<Grade> {
    return this.http.put<Grade>(`${this.baseUrl}/${id}`, grade);
  }

  deleteGrade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  uploadBulkGrades(grades: Grade[]): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/bulk`, grades, {
      responseType: 'text' as 'json',
    });
  }
}
