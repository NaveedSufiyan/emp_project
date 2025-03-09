import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeWithPerformance } from '../../model/interface/emp';
import { EmployeeService } from '../../Services/employee.service';


@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent {
  performanceIdToSearch: number | null = null;
  employeeWithPerformance: EmployeeWithPerformance | null = null;
  loading = false;
  error: string | null = null;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {}

  searchEmployeePerformance(): void {
    if (this.performanceIdToSearch) {
      this.loading = true;
      this.error = null;
      this.employeeService.getEmployeeWithPerformance(this.performanceIdToSearch).subscribe({
        next: (data) => {
          this.employeeWithPerformance = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Employee Id Not Found.';
          this.loading = false;
          console.error(error);
        }
      });
    }
  }
  logout(): void {
    // Perform any necessary logout logic here (e.g., clearing tokens, session)
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
