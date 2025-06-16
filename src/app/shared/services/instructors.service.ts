import { Injectable } from '@angular/core';
import { Instructor } from '../../interfaces/instructor.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstructorsService {
  private apiUrl = 'http://localhost:3000/instructors';
  constructor(private http: HttpClient) {}

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.apiUrl);
  }

}
