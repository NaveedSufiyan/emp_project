import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, EmployeeWithPerformance } from '../model/interface/emp';

@Injectable({
  providedIn: 'root'

})

export class EmployeeService {
  constructor(private http: HttpClient) { }
  private employeeApiUrl = 'http://localhost:9191/api/employees';


  getEmployees(): Observable<Employee[]> {
    console.log("")
    return this.http.get<Employee[]>(`${this.employeeApiUrl}/getAll`); 
  }

  getEmployee(id: number): Observable<Employee> { 
    const url = `${this.employeeApiUrl}/${id}`;
    return this.http.get<Employee>(url);
  }

  getEmployeesByDeptName(deptName: string): Observable<Employee[]> {
    const url = `${this.employeeApiUrl}/getEmployeesByDeptName/${deptName}`;
    return this.http.get<Employee[]>(url);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    const url = `${this.employeeApiUrl}/${id}`;
    return this.http.put<Employee>(url, employee);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeeApiUrl, employee);

  }
  getEmployeeWithPerformance(performanceId: number): Observable<EmployeeWithPerformance> {
    return this.http.get<EmployeeWithPerformance>(`${this.employeeApiUrl}/performance/${performanceId}`);
  }

 deleteEmployee(id: number): Observable<any> {
    const url = `${this.employeeApiUrl}/delete/${id}`;
    return this.http.delete(url);
  }
}