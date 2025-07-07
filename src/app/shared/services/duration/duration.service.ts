import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Duration } from '../../../interfaces/duration.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DurationService {
  baseUrl = environment.apiUrl;
  durations = signal<Duration[]>([]);
  constructor(private http: HttpClient) {}

  getDurations(): Observable<Duration[]> {
    return this.http.get<Duration[]>(`${this.baseUrl}/duration`);
  }
}
