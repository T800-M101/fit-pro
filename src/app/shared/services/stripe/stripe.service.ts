import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StripeService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

 createCheckoutSession(price: number, userId: number, duration: number) {
    return this.http.post<{ url: string }>(`${this.baseUrl}/payments/create-checkout-session`, {
      price,
      userId,
      duration
    });
  }
}
