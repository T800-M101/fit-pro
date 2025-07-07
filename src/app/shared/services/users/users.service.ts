import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../interfaces/user.interface';
import { AuthService } from '../auth/auth.service';
import { UpdatedUser } from '../../../interfaces/updated-user.interface';
import { UpdateUser } from '../../../interfaces/update-user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = environment.apiUrl;
  userId!: number | null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userId = this.authService.extractUserIdFromToken();
  }

  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/users/count`);
  }

  findUserById(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${this.userId}`);
  }

  updateUser(payload: Partial<UpdateUser>): Observable<UpdatedUser> {
    return this.http.patch<UpdatedUser>(`${this.baseUrl}/users/${this.userId}`, payload);
  }
}
