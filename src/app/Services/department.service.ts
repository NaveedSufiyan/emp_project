import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../model/interface/department';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private departmentApiUrl = 'http://localhost:8084/api/departments'; // Base URL

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<any[]> { // Assuming your Department model is 'any' or replace it
    return this.http.get<any[]>(`${this.departmentApiUrl}/getAll`);
  }


  createDepartment(department: any): Observable<any> { // Assuming your Department model is 'any' or replace it
    return this.http.post<any>(this.departmentApiUrl, department);
  }

  updateDepartment(id: number, department: Department): Observable<Department> {
    const url = `${this.departmentApiUrl}/update/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Add this
    return this.http.put<Department>(url, department, { headers }).pipe( // Add headers
        catchError(this.handleError)
    );
}

  // Add the deleteDepartment method
  deleteDepartment(id: number): Observable<any> {
    const url = `${this.departmentApiUrl}/delete/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error(
            `Backend returned code ${error.status}, ` + `body was: ${error.error}`
        );
    }
    return throwError('Something bad happened; please try again later.');
}
}