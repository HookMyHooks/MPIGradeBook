import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grade } from '../dtos/grade';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  private readonly baseUrl = 'http://localhost:8189/grades';

  constructor(private readonly http: HttpClient) {}

  getAllGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.baseUrl);
  }

  getGradeById(id: number): Observable<Grade> {
    return this.http.get<Grade>(`${this.baseUrl}/${id}`);
  }
}