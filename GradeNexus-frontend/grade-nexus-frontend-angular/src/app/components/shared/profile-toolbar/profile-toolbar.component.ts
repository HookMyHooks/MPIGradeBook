import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'profile-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-toolbar.component.html',
  styleUrls: ['./profile-toolbar.component.scss'],
})
export class ProfileToolbarComponent implements OnInit {
  userFullName = '';
  showDropdown = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userDetails') ?? '{}');
    this.userFullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
