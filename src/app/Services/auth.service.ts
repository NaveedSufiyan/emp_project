import { Injectable } from '@angular/core';
import { User } from '../model/interface/reg';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9191/auth';
  constructor(private http:HttpClient) { }

  register(user:User): Observable<string>{
    const api=this.baseUrl+`/new`;
    // debugger;
    return this.http.post(api,user,{ responseType: 'text' });
 
  }
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, credentials).pipe(
      map((response: any) => {
        if (response && response.token && response.userId) {
          this.setToken(response.token);
          this.setUserId(response.userId);
          return response;
        } else {
          throw new Error('Token or userId not found in response');
        }
      })
    );
  }
 
 
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
 
  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }
 
  removeToken(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
  }
 
  getUserId(): number | null {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      return parseInt(userId, 10);
    }
    return null;
  }
 
  setUserId(userId: number): void {
    localStorage.setItem('user_id', userId.toString());
  }
 
  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.roles;
      } catch (e) {
        console.error('Error decoding token', e);
        return null;
      }
    }
    return null;
  }
 
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

