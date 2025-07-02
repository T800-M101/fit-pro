import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation/navigation.service';
import { AuthState, Role } from '../../services/auth/auth-enum';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isMenuOpen = signal(false);
  userName: string | null = null;
  AuthState = AuthState;
  userRole: string | null = null;
  Role = Role;
 

  constructor(
    public authService: AuthService,
    public navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.userRole();
  }

  authState(): any {
    return this.authService.getAuthState();
  }

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isOpen());
  }

  isOpen(): boolean {
    return this.isMenuOpen();
  }
}
