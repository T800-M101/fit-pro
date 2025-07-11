import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  baseUrl = environment.apiUrl;

  paymentData = signal<any>({});

  constructor(private http: HttpClient) { }

  getHistory(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/payments/history`);
}
}
