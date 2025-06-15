import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  showModal = signal<boolean>(false);
  bookedClass = signal<string>("");

  constructor() { }
}
