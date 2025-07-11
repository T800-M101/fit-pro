import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaymentsService } from '../../../shared/services/payments/payments.service';
import { Subscription } from 'rxjs';
import { Payment } from '../../../interfaces/payment.interface';

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.scss'
})
export class PaymentHistoryComponent implements OnInit, OnDestroy {
  payments!: Payment[]; 
  paymentsSub$ = new Subscription();

  constructor(private paymentService: PaymentsService ){}

  ngOnDestroy(): void {
    this.paymentsSub$.unsubscribe();
  }

  ngOnInit(): void {
    this.paymentsSub$ = this.paymentService.getHistory().subscribe({
      next: (response: any) => {
        console.log(response)
        this.payments = response;
      },
      error: (error) => console.error(error)
    });
  }
}
