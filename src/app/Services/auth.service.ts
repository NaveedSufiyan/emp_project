import { Injectable } from '@angular/core';
import { User } from '../model/interface/reg';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // Makes the service available throughout the app
})
export class AuthService {
  private baseUrl = 'http://localhost:9191/auth'; // Base URL for authentication API

  constructor(private http: HttpClient) { } // Inject HttpClient for making HTTP requests

  // Method to register a new user
  register(user: User): Observable<string> {
    const api = this.baseUrl + `/new`; // API endpoint for registration
    return this.http.post(api, user, { responseType: 'text' }); // Send POST request with user data
  }

  // Method to log in a user
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, credentials).pipe( // Send POST request with credentials
      map((response: any) => { // Process the response
        if (response && response.token && response.userId) { // Check if response contains token and userId
          this.setToken(response.token); // Save token to local storage
          this.setUserId(response.userId); // Save userId to local storage
          return response; // Return the response
        } else {
          throw new Error('Token or userId not found in response'); // Throw error if token or userId is missing
        }
      })
    );
  }

  // Method to get the token from local storage
  getToken(): string | null {
    return localStorage.getItem('access_token'); // Retrieve token from local storage
  }

  // Method to save the token to local storage
  setToken(token: string): void {
    localStorage.setItem('access_token', token); // Save token to local storage
  }

  // Method to remove the token from local storage
  removeToken(): void {
    localStorage.removeItem('access_token'); // Remove token from local storage
    localStorage.removeItem('user_id'); // Remove userId from local storage
  }

  // Method to get the userId from local storage
  getUserId(): number | null {
    const userId = localStorage.getItem('user_id'); // Retrieve userId from local storage
    if (userId) {
      return parseInt(userId, 10); // Convert userId to number
    }
    return null; // Return null if userId is not found
  }

  // Method to save the userId to local storage
  setUserId(userId: number): void {
    localStorage.setItem('user_id', userId.toString()); // Save userId to local storage
  }

  // Method to get the user role from the token
  getUserRole(): string | null {
    const token = this.getToken(); // Retrieve token from local storage
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode token payload
        return payload.roles; // Return user roles
      } catch (e) {
        console.error('Error decoding token', e); // Log error if decoding fails
        return null; // Return null if decoding fails
      }
    }
    return null; // Return null if token is not found
  }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken(); // Return true if token is found, false otherwise
  }
}
