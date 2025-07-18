import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../../../interfaces/booking.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  baseUrl = environment.apiUrl;

  showModal = signal<boolean>(false);
  bookedClass = signal<string>("");

 
   constructor(private http: HttpClient) { }

   bookClass(bookingData: Booking[]): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/bookings`, bookingData, {withCredentials: true});
   }
 
}
