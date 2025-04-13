import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../dtos/subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private readonly baseUrl = 'http://localhost:8189/subjects'; 

  constructor(private readonly http: HttpClient) {}

  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.baseUrl);
  }

  getSubjectById(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.baseUrl}/${id}`);
  }
}
