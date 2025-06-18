import { Component } from '@angular/core';
import { BookClassModalComponent } from '../../shared/modals/book-class-modal/book-class-modal.component';
import { BookingService } from '../../shared/services/booking/booking.service';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [BookClassModalComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss',
})
export class ClassesComponent {
  enrroledClass = '';

  constructor(public bookingService: BookingService) {}

  bookClass(cls: string): void {
    this.bookingService.bookedClass.set(cls);
    this.bookingService.showModal.set(true);
  }

  //   openModal(className: string) {
  //   this.selectedClass = className;
  // }

  // closeModal() {
  //   this.selectedClass = null;
  // }
}
