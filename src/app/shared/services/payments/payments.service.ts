import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  paymentData = signal<any>({});

  constructor() { }
}
