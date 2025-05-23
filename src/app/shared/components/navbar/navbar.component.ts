import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SocialComponent } from '../social/social.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, SocialComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.set(!this.isOpen());
  }

  isOpen() {
  return this.isMenuOpen();
}
}
