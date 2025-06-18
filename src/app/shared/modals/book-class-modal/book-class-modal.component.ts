import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-class-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-class-modal.component.html',
  styleUrl: './book-class-modal.component.scss',
})
export class BookClassModalComponent implements OnInit {
  showTooltip = true;
  constructor(public bookingService: BookingService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showTooltip = false;
    }, 5000);
  }

  confirmBooking(): void {
    this.bookingService.showModal.set(false);
  }

  closeModal(): void {
    this.bookingService.showModal.set(false);
  }
}
