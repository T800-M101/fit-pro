import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DurationService } from '../../shared/services/duration/duration.service';
import { Duration } from '../../interfaces/duration.interface';
import { StripeService } from '../../shared/services/stripe/stripe.service';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class PaymentsComponent  {
  membershipName!: string;
  durationId!: number;
  duration!: number;
  strPrice!: string;
  price!: number;
  totalPrice!: number;
  durations!: Duration[];
  payment!: number;

  constructor(
    private router: Router,
    private durationService: DurationService,
    private stripeService: StripeService,
    private authService: AuthService
  ) {
    this.durations = this.durationService.durations();
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    if (state) {
      this.membershipName = state['membershipName'];
      this.strPrice = state['price'];
      this.price = Number(this.strPrice.replace(/[^0-9.]/g, ''))
      this.durationId = state['durationId'];
      this.duration = this.durations[this.durationId - 1].months;
      this.totalPrice = Math.round(this.price *  this.durations[this.durationId - 1].multiplier);
    }
  }

  onPay(): void {
    const userId = this.authService.userId();
    if (!userId) {
    console.error('User ID not found in token');
    return;
  }

  this.stripeService.createCheckoutSession(this.totalPrice, userId, this.duration).subscribe({
    next: (res) => {
      window.location.href = res.url; // Redirect to Stripe Checkout
    },
    error: (err) => {
      console.error('Stripe session error:', err);
    },
  });


  }
}
