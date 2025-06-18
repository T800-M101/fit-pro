import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Membership } from '../../../interfaces/membership.interface';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {


  private apiUrl = 'http://localhost:3000/membership-plans';
    constructor(private http: HttpClient) {}
  
    getMembershipPlans(): Observable<Membership[]> {
      return this.http.get<Membership[]>(this.apiUrl);
    }

  
}
