import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from './token/token.service';

export interface User {
  id: number;
  email: string;
  username: string;
  student?: any;
  teacher?: any;
  authToken: string;
  role: 'STUDENT' | 'TEACHER';
}

export interface RegisterRequest {
  email: string;
  userPassword: string;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:5432/api/auth'; 
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private tokenService:TokenService) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string, role: string }>(
      `${this.API_URL}/login`,
      { email, password }
    ).pipe(
      tap(({ token }) => {
        this.tokenService.setToken(token);
      }),
      catchError(this.handleError)
    );
  }
  
  

  register(registerData: RegisterRequest): Observable<{token:string,role: 'STUDENT' | 'TEACHER'}> {
    return this.http.post<{ token: string; role: 'STUDENT' | 'TEACHER' }>(
      `${this.API_URL}/register`,
      registerData
    ).pipe(
      tap(({ token, role }) => {
        // Save the token to localStorage using your TokenService
        this.tokenService.setToken(token);
  
        // Decode JWT payload to get additional info 
        const payload = this.tokenService.getPayload();
  
        const user: User = {
          id: 0, // Optional unless fetched later
          email: registerData.email,
          username: payload?.sub,
          authToken: token,
          role: role,
          student: role === 'STUDENT' ? {} : undefined,
          teacher: role === 'TEACHER' ? {} : undefined
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
    return this.currentUserValue?.authToken || null;
  }

  private handleError(error: any) {
    const message = error.error?.message || 'Something went wrong';
    return throwError(() => new Error(message));
  }
}
