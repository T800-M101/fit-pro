import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  baseUrl = environment.apiUrl;

  constructor( private http: HttpClient) { }

 getWeeklySessions(classId?: number): Observable<any> {
  let params = new HttpParams();
  if (classId) {
    params = params.set('classId', classId);
  }

  return this.http.get<any>(`${this.baseUrl}/sessions/getWeeklySessions`, { params });
}

}
