import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookClassModalComponent } from '../../shared/modals/book-class-modal/book-class-modal.component';
import { BookingService } from '../../shared/services/booking/booking.service';
import { ClassesService } from '../../shared/services/classes/classes.service';
import { Class } from '../../interfaces/class.interface';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../shared/services/sessions/session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [BookClassModalComponent, CommonModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss',
})
export class ClassesComponent implements OnInit, OnDestroy {
  enrroledClass = '';

  classes!: Class[];
  selectedClass: any = null; 
  selectedClassId: number | null = null;
  schedule!: any[];
  classId!: number;
  classSubs$ = new Subscription();

  constructor(public bookingService: BookingService, private classesService: ClassesService, private sessionService: SessionService) {}

  ngOnDestroy(): void {
    this.classSubs$.unsubscribe();
  }

  ngOnInit(): void {
    this.classSubs$ = this.classesService.getClasses().subscribe({
      next: (res) => {
         this.classes = res;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
    
    bookClass(classId: number): void {
     this.selectedClass = this.classes.find(cl => cl.id === classId);
     this.selectedClassId = this.selectedClassId === classId ? null : classId;
     this.classesService.getSessionsByClassId(classId).subscribe(data => {
     this.schedule = data.sessions;
    });
   
    this.bookingService.showModal.set(true);
    //this.bookingService.bookedClass.set(cls);
    // this.bookingService.showModal.set(true);
  }

 

}