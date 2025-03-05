import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private baseUrl = 'http://localhost:9191/api/performance'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  createPerformance(performance: Performance): Observable<Performance> {
    return this.http.post<Performance>(this.baseUrl, performance);
  }
  

  
}
