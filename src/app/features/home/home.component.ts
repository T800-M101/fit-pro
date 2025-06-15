import { Component } from '@angular/core';
import { CountUpComponent } from '../../shared/components/count-up/count-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CountUpComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToSubscription(cardType: string) {
    this.router.navigate(['/subscription'], {
      queryParams: { type: cardType },
    });
  }
}
