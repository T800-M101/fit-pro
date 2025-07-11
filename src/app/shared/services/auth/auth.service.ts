import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthState, Role } from './auth-enum';
import { RegisterUserDto } from '../../../features/dto/register-user';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;

  private _tokenKey = 'token';
  private jwtHelper = new JwtHelperService();
  private _userRegisteredKey = 'userRegistered';
  private tokenMonitor: any = null;

  token = signal<string | null>(this.getToken());
  userId = signal<number | null>(this.extractUserIdFromToken());
  userName = signal<string | null>(this.extractNameFromToken());
  authState = signal<AuthState>(this.getAuthState());
  userRole = signal<string | null>(this.extractRoleFromToken());
  membershipStatus = signal<boolean>(this.extractMembershipStatusFromToken());

  hasToken(): boolean {
    return !!localStorage.getItem(this._tokenKey);
  }

  readonly isAuthenticated = computed(
    () =>
      this.authState() === AuthState.Authenticated &&
      this.membershipStatus() === true
  );

  readonly isGuest = computed(
    () => this.authState() === AuthState.NotRegistered
  );


  readonly isLoggedOutRegistered = computed(
    () => this.authState() === AuthState.Expired || !this.hasToken()
  );

  readonly isLoggedInUser = computed(
    () =>
      this.authState() === AuthState.Authenticated &&
      this.userRole() === Role.User
  );

  readonly isAdminOrEmployee = computed(
    () =>
      this.authState() === AuthState.Authenticated &&
      (this.userRole() === Role.Admin || this.userRole() === Role.Employee)
  );

  constructor(private router: Router, private http: HttpClient) {
    this.updateAuthState();
    this.startTokenMonitor();
  }

  
   private decodeToken(): any | null {
    const token = this.getToken();
    if (!token || this.jwtHelper.isTokenExpired(token)) return null;
    return this.jwtHelper.decodeToken(token);
  }
  
  private extractNameFromToken(): string | null {
    const decoded = this.decodeToken();
    const fullName = decoded?.name;
    return fullName ? fullName.trim().split(/\s+/)[0] : null;
  }
  
  private extractRoleFromToken(): string | null {
    const decoded = this.decodeToken();
    const role = decoded?.role;
    return role ?? null;
  }
  
   private extractMembershipStatusFromToken(): boolean {
    const decoded = this.decodeToken();
    const membership = decoded?.membershipStatus;
    
    return membership === true || membership === 'true';
  }
  
  extractUserIdFromToken(): number | null {
    const decoded = this.decodeToken();
    const userId = decoded?.sub;
    
    if (!userId) return null;
    
    return typeof userId === 'string' ? parseInt(userId, 10) : userId;
  }

  private persistToken(token: string): void {
  try {
    localStorage.setItem(this._tokenKey, token);
    this.token.set(token);
    this.updateAuthState();
    this.startTokenMonitor();
  } catch (e) {
    console.error('Error saving token', e);
    this.removeToken();
  }
}

  removeToken(): void {
    localStorage.removeItem(this._tokenKey);
  }

  removeUserRegistered(): void {
   localStorage.removeItem(this._userRegisteredKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this._tokenKey);
  }

  getAuthState(): AuthState {
    const token = this.getToken();

    if (!token) {
      if (this.getUserRegistered()) {
        return AuthState.Expired;
      }
      return AuthState.NotRegistered;
    }

    if (this.jwtHelper.isTokenExpired(token)) return AuthState.Expired;

    return AuthState.Authenticated;
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }
  

  saveToken(token: string): void {
    localStorage.setItem(this._tokenKey, token);
    localStorage.setItem(this._userRegisteredKey, 'true'); // Must set here!
    this.updateAuthState();
    this.startTokenMonitor();
  }

  updateAuthState(): void {
    this.authState.set(this.getAuthState());
    this.userName.set(this.extractNameFromToken());
    this.userRole.set(this.extractRoleFromToken());
    this.userId.set(this.extractUserIdFromToken());
    this.membershipStatus.set(this.extractMembershipStatusFromToken());
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, data).pipe(
      tap((response) => {
        if (response.token) this.persistToken(response.token);
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.removeToken();
    this.removeUserRegistered();
    this.updateAuthState();
    this.router.navigate(['/']);
  }

  register(data: RegisterUserDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, data).pipe(
      tap((response) => {
        if (response.token) {
          this.persistToken(response.token);
        }
      })
    );
  }

  getUserRegistered(): boolean {
    return localStorage.getItem('userRegistered') === 'true';
  }

 

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

  /*************************************** API CALLS ***************************/  
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/request-password-reset`, {
      email,
    });
  }

  resetPassword(dto: { token: string; newPassword: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/auth/reset-password`, dto);
  }

  createStripeSession(data: any) {
    return this.http.post<{ checkoutUrl: string }>(
      `${this.baseUrl}/create-checkout-session`,
      data
    );
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/refresh-token`, {});
  }
}
