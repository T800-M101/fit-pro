import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  private apiUrl = 'http://localhost:3000/users/count';
    constructor(private http: HttpClient) {}
  
    getTotalUsers(): Observable<number> {
      return this.http.get<number>(this.apiUrl);
    }
  
}
