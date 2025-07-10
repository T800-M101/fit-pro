import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { WhatsappComponent } from './shared/components/whatsapp/whatsapp.component';
import { AuthService } from './shared/services/auth/auth.service';
import { AuthState } from './shared/services/auth/auth-enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, WhatsappComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'fit-pro';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.updateAuthState();

    const isStripeRedirect = window.location.href.includes('session_id');

    if (this.authService.authState() === AuthState.Authenticated && isStripeRedirect) {
      this.authService.refreshToken().subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.authService.updateAuthState();
        },
        error: (err) => {
          console.error('Refresh failed after Stripe redirect', err);
        },
      });
    }
  }

}
