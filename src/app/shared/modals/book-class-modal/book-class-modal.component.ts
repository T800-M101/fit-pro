import { Component, input, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';
import { CommonModule } from '@angular/common';
import { Session } from '../../../interfaces/session.interface';
import { AuthService } from '../../services/auth/auth.service';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ToastrService } from 'ngx-toastr';
import { Booking } from '../../../interfaces/booking.interface';
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
  schedule = input<any>();
  classId = input<any>();
  showTooltip = true;
  calendarByDay: Record<string, Session[]> = {};
  sessions!: any[];
  className = input<string>('');
  userId!: number | null;
  selectedSessionDate: string | null = null;

  bookingList: Booking[] = [];


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


  getTimeToISO(date: string, time: string): string {
    const combinedDateTime = dayjs(`${date} ${time}`, 'YYYY-MM-DD h:mm A');
    return combinedDateTime.toISOString();
  }

  confirmBooking(): void {
    this.bookingService
      .bookClass(this.bookingList)
      .subscribe({
        next: (response) => {
          this.toastr.success('Classes booked successfully!');
          this.closeModal();
        },
        error: (error) => {
          this.toastr.error(error.error.message);
        }
      });
  }

  closeModal(): void {
    this.bookingService.showModal.set(false);
  }

toggleBooking(event: MouseEvent, booking: Booking): void {
  const exists = this.bookingList.some(
    b =>
      b.classId === booking.classId &&
      b.date === booking.date &&
      b.time === booking.time &&
      b.userId === booking.userId
  );

  this.bookingList = exists
    ? this.bookingList.filter(
        b =>
          !(
            b.classId === booking.classId &&
            b.date === booking.date &&
            b.time === booking.time &&
            b.userId === booking.userId
          )
      )
    : [...this.bookingList, booking];
 
    const btn = event.target as HTMLElement;
    btn.classList.toggle('selected');
}
}
