import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation/navigation.service';
import { AuthState } from '../../services/auth/auth-enum';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isMenuOpen = signal(false);
  userName: string | null = null;
  AuthState = AuthState;

  constructor(
    public authService: AuthService,
    public navigationService: NavigationService
  ) {}

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
