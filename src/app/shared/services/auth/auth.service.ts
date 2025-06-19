import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthState } from './auth-enum';
import { RegisterUserDto } from '../../../features/dto/register-user';
import { ChangePasswordDTO } from '../../../interfaces/change-password.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private tokenKey = 'token';
  private jwtHelper = new JwtHelperService();

  userName = signal<string | null>(this.extractNameFromToken());
  authState = signal<AuthState>(this.getAuthState());
  userRole = signal<string | null>(this.extractRoleFromToken());

  constructor(private router: Router, private http: HttpClient) {
    this.updateAuthState();
    this.startTokenMonitor();
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.startTokenMonitor();
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    return this.jwtHelper.isTokenExpired(token) ? false : true;
  }

  extractNameFromToken(): string | null {
    const token = this.getToken();
    if (!token || this.jwtHelper.isTokenExpired(token)) return null;

    const decoded = this.jwtHelper.decodeToken(token);
    const fullName: string = decoded?.name;
    if (!fullName) return null;

    return fullName.trim().split(/\s+/)[0];
  }

  extractRoleFromToken(): string | null {
    const token = this.getToken();
    if (!token || this.jwtHelper.isTokenExpired(token)) return null;

    const decoded = this.jwtHelper.decodeToken(token);
    const role: string = decoded?.role;
    return role ?? null;
  }

  getAuthState(): AuthState {
    const token = this.getToken();
    if (!token) return AuthState.NotRegistered;
    if (this.jwtHelper.isTokenExpired(token)) return AuthState.Expired;
    return AuthState.Authenticated;
  }

  updateAuthState(): void {
    this.authState.set(this.getAuthState());
    this.userName.set(this.extractNameFromToken());
    this.userRole.set(this.extractRoleFromToken());
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, data).pipe(
      tap((response) => {
        if (response.token) {
          this.saveToken(response.token);
          this.updateAuthState();
        }
      })
    );
  }

  logout(): void {
    this.removeToken();
    this.updateAuthState();
    this.router.navigate(['/']);
  }

  register(data: RegisterUserDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, data).pipe(
      tap((response) => {
        if (response.token) {
          this.saveToken(response.token);
          this.updateAuthState();
        }
      })
    );
  }

  private tokenMonitor: any = null;

  private startTokenMonitor(): void {
    const token = this.getToken();
    if (!token) return;

    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    if (!expirationDate) return;

    const expiresInMs = expirationDate.getTime() - new Date().getTime();

    if (this.tokenMonitor) {
      clearTimeout(this.tokenMonitor);
    }

    this.tokenMonitor = setTimeout(() => {
      this.updateAuthState();
      this.logout();
    }, expiresInMs);
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/request-password-reset`, {
      email,
    });
  }

  resetPassword(dto: { token: string; newPassword: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/auth/reset-password`, dto);
  }
}
