import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../services/sessions/session.service';
import { Session } from '../../../interfaces/session.interface';

@Component({
  selector: 'app-book-class-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-class-modal.component.html',
  styleUrl: './book-class-modal.component.scss',
})
export class BookClassModalComponent implements OnInit {
  showTooltip = true;
  calendarByDay: Record<string, Session[]> = {}; 
  sessions!: any[];

  get calendarDays(): string[] {
  return Object.keys(this.calendarByDay);
}
  constructor(public bookingService: BookingService, private sessionService: SessionService ) {}

  sessionsByDay: any[] = [];

  ngOnInit() {
    this.sessionService.getWeeklySessions().subscribe({
      next: (data) => {
        this.sessionsByDay = data;
      },
      error: (err) => {
        console.error('Error fetching sessions', err);
      }
    });
  }


bookClass(): void {
  
}

  confirmBooking(): void {
    this.bookingService.showModal.set(false);
  }

  closeModal(): void {
    this.bookingService.showModal.set(false);
  }
}
