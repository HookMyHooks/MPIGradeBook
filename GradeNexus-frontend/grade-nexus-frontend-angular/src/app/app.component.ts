import { Component } from '@angular/core';
import { TeacherDashboardComponent } from './components/teacher/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from "./components/student/student-dashboard/student-dashboard.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { RegisterComponent } from "./components/auth/register/register.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'grade-nexus-frontend-angular';
}
