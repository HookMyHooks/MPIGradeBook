import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegisterRequest } from '../dtos/register-request';
import { User } from '../dtos/user';
import { TokenService } from './token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8189/api/users';
  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser: Observable<User | null> =
    this.currentUserSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {
    this.restoreUserFromToken();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  private buildUserFromToken(): User | null {
    const token = this.tokenService.getToken();
    const payload = this.tokenService.getPayload();

    if (!token || !payload) return null;

    return {
      id: 0,
      email: payload.email ?? '',
      username: payload.sub ?? '',
      authToken: token,
      role: payload.role,
      student: payload.role === 'STUDENT' ? {} : undefined,
      teacher: payload.role === 'TEACHER' ? {} : undefined,
    };
  }

  private restoreUserFromToken(): void {
    if (this.tokenService.isTokenValid()) {
      const user = this.buildUserFromToken();
      this.currentUserSubject.next(user);
    } else {
      this.currentUserSubject.next(null);
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<{ token: string; role: string }>(`${this.API_URL}/login`, {
        email,
        password,
      })
      .pipe(
        tap(({ token, role }) => {
          this.tokenService.setToken(token);

          const payload = this.tokenService.getPayload();

          const user: User = {
            id: 0,
            email,
            username: payload?.sub,
            authToken: token,
            role: role as 'STUDENT' | 'TEACHER',
            student: role === 'STUDENT' ? {} : undefined,
            teacher: role === 'TEACHER' ? {} : undefined,
          };

          this.currentUserSubject.next(user);
        }),
        catchError(this.handleError)
      );
  }

  register(
    registerData: RegisterRequest
  ): Observable<{ token: string; role: 'STUDENT' | 'TEACHER' }> {
    return this.http
      .post<{ token: string; role: 'STUDENT' | 'TEACHER' }>(
        `${this.API_URL}/register`,
        registerData
      )
      .pipe(
        tap(({ token, role }) => {
          this.tokenService.setToken(token);

          const payload = this.tokenService.getPayload();

          const user: User = {
            id: 0,
            email: registerData.email,
            username: payload?.sub,
            authToken: token,
            role: role,
            student: role === 'STUDENT' ? {} : undefined,
            teacher: role === 'TEACHER' ? {} : undefined,
          };

          this.currentUserSubject.next(user);
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.tokenService.logout();
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  isStudent(): boolean {
    return this.currentUserValue?.role === 'STUDENT';
  }

  isTeacher(): boolean {
    return this.currentUserValue?.role === 'TEACHER';
  }

  getToken(): string | null {
    return this.currentUserValue?.authToken ?? null;
  }

  private handleError(error: any) {
    const message =
      error.error?.message ?? error.error ?? 'Something went wrong';
    return throwError(() => new Error(message));
  }

  resetPassword(email: string, password: string): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.API_URL}/reset-password`, {
        email,
        password,
      })
      .pipe(catchError(this.handleError));
  }
}
