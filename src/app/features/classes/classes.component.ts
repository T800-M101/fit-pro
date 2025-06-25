import { Component, OnInit } from '@angular/core';
import { BookClassModalComponent } from '../../shared/modals/book-class-modal/book-class-modal.component';
import { BookingService } from '../../shared/services/booking/booking.service';
import { ClassesService } from '../../shared/services/classes/classes.service';
import { Class } from '../../interfaces/class.interface';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../shared/services/sessions/session.service';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [BookClassModalComponent, CommonModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss',
})
export class ClassesComponent implements OnInit {
  enrroledClass = '';

  classes!: Class[];

  schedule!: any[];
  classId!: number;

  constructor(public bookingService: BookingService, private classesService: ClassesService, private sessionService: SessionService) {}

  ngOnInit(): void {
    this.classesService.getClasses().subscribe({
      next: (res) => {
         this.classes = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  bookClass(classId: number): void {
     this.classesService.getScheduleByClassId(classId).subscribe(data => {
      console.log('LA DATA', data)
     this.schedule = data;
     this.classId = data.classId;

     
    });
     //this.classesService.getScheduleByClassId(classId).subscribe(data => console.log('SCHE',data));
    // this.sessionService.getWeeklySessions(classId).subscribe(res => console.log('RES',res))
    this.bookingService.showModal.set(true);
    //this.bookingService.bookedClass.set(cls);
    // this.bookingService.showModal.set(true);
  }

  //   openModal(className: string) {
  //   this.selectedClass = className;
  // }

  // closeModal() {
  //   this.selectedClass = null;
  // }


}