import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Membership } from '../../../interfaces/membership.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}
  
    getMembershipPlans(): Observable<Membership[]> {
      return this.http.get<Membership[]>(`${this.baseUrl}/membership-plans`);
    }

  
}
