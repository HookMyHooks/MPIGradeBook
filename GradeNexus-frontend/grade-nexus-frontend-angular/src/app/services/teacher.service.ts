import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../dtos/teacher';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private readonly baseUrl = 'http://localhost:8189/api/teachers';

  constructor(private readonly http: HttpClient) {}

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.baseUrl);
  }

  getTeacherById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.baseUrl}/${id}`);
  }
}
