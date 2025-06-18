import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { WhatsappComponent } from './shared/components/whatsapp/whatsapp.component';
import { NavigationService } from './shared/services/navigation/navigation.service';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, WhatsappComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fit-pro';

  constructor(private navigationService: NavigationService, private authService: AuthService) {
    effect(() => {
      this.authService.authState();
      this.authService.extractNameFromToken();

    })
  }

}
