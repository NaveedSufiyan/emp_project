import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../model/interface/department';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class DepartmentService {
  private departmentApiUrl = 'http://localhost:9191/api/departments'; 

  constructor(private http: HttpClient) { } // Inject HttpClient for making HTTP requests

  // Method to get all departments
  getDepartments(): Observable<any[]> { 
    return this.http.get<any[]>(`${this.departmentApiUrl}/getAll`); 
  }

  // Method to create a new department
  createDepartment(department: any): Observable<any> {
    return this.http.post<any>(this.departmentApiUrl, department); 
  }

  // Method to update an existing department
  updateDepartment(id: number, department: Department): Observable<Department> {
    const url = `${this.departmentApiUrl}/update/${id}`; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // we are telling that content-type is of json format
    return this.http.put<Department>(url, department, { headers }).pipe( 
        catchError(this.handleError) // Handle errors
    );
  }

  // Method to delete a department
  deleteDepartment(id: number): Observable<any> {
    const url = `${this.departmentApiUrl}/delete/${id}`; // API endpoint for deleting a department
    return this.http.delete(url).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Method to handle errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message); // Log client-side error
    } else {
        console.error(
            `Backend returned code ${error.status}, ` + `body was: ${error.error}` // Log server-side error
        );
    }
    return throwError('There is Some Problem Try again.'); // Return a user-friendly error message
  }
}
