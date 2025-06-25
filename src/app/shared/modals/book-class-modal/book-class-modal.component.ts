import { Component, input, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';
import { CommonModule } from '@angular/common';
import { Session } from '../../../interfaces/session.interface';
import { AuthService } from '../../services/auth/auth.service';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ToastrService } from 'ngx-toastr';
dayjs.extend(utc);
dayjs.extend(timezone);

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

  userId!: number | null;

  schedule = input<any>();
  classId = input<any>();

  get calendarDays(): string[] {
    return Object.keys(this.calendarByDay);
  }
  constructor(
    public bookingService: BookingService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  sessionsByDay: any[] = [];

  ngOnInit() {
    this.userId = this.authService.extractUserIdFromToken();
  }

  bookHour(bookingData: any): void {
    this.bookingService
      .bookHour(bookingData)
      .subscribe({
        next: (response) => {
          this.toastr.success('Classes booked successfully!');
        },
        error: (error) => {
          this.toastr.error(error.error.message);
        }
      });
  }

  getTimeToISO(date: string, time: string): string {
    const combinedDateTime = dayjs(`${date} ${time}`, 'YYYY-MM-DD h:mm A');
    return combinedDateTime.toISOString();
  }

  confirmBooking(): void {
    this.bookingService.showModal.set(false);
  }

  closeModal(): void {
    this.bookingService.showModal.set(false);
  }
}
