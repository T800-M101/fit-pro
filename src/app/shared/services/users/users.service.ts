import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
baseUrl = environment.apiUrl;
  
 
    constructor(private http: HttpClient) {}
  
    getTotalUsers(): Observable<number> {
      return this.http.get<number>(`${this.baseUrl}/users/count`);
    }
  
}
