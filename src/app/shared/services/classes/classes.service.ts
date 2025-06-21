import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
   baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getClasses(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/classes/get`);
    }
}
