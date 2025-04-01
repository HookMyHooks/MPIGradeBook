import { Routes } from '@angular/router';
import { TeacherDashboardComponent } from './components/teacher/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './components/student/student-dashboard/student-dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'teacher-dashboard',
        pathMatch: 'full'
      },
      {
        path: 'teacher-dashboard',
        component: TeacherDashboardComponent
      },
      {
        path: 'student-dashboard',
        component: StudentDashboardComponent
      },
      {
      path: 'login',
      component: LoginComponent
      },
      {
        path:'register',
        component: RegisterComponent
      }
];