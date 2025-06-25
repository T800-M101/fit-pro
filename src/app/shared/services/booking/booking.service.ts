import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  showModal = signal<boolean>(false);
  bookedClass = signal<string>("");

   baseUrl = environment.apiUrl;
 
   constructor(private http: HttpClient) { }

   bookHour(bookingData: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/bookings`, bookingData);
   }
 
}
