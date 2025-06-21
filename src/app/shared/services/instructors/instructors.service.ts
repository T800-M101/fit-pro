import { Injectable } from '@angular/core';
import { Instructor } from '../../../interfaces/instructor.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InstructorsService {
 baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(`${this.baseUrl}/instructors`);
  }

}
