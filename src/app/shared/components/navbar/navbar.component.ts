import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen = signal(false);

  constructor(public navigationService: NavigationService){}

  toggleMenu() {
    this.isMenuOpen.set(!this.isOpen());
  }

  isOpen() {
  return this.isMenuOpen();
}
}
