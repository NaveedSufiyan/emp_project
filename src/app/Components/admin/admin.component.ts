import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DepCreateComponent } from '../dep-create/dep-create.component';
import { CommonModule } from '@angular/common';
import { PerformanceCreateComponent } from '../performance-create/performance-create.component'; // Import PerformanceCreateComponent
import { EmployeeCreateComponent } from '../employee-create/employee-create.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, EmployeeCreateComponent, DepCreateComponent, PerformanceCreateComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  showUpdateForm = false;  // Controls visibility of an update form
  employeeIdToUpdate: number | null = null; // Stores ID of employee being updated

  @ViewChild(PerformanceCreateComponent) performanceCreateComponent!: PerformanceCreateComponent; // Gets reference to PerformanceCreateComponent


  constructor(private router: Router) { }  // Inject Router service

  logout(): void {
    sessionStorage.removeItem('yourSessionKey');  // Clear session data
    this.router.navigate(['/login']);  // Navigate to login page
  }

  goToEmployees(): void {
    this.router.navigate(['/employees']);  // Navigate to employees list
  }

  openPerformanceModal() {
    this.performanceCreateComponent.openModal();  // Call method of child component to open modal
  }

  onPerformanceModalClosed() {// This method is called when the performance modal is closed.
    console.log("Performance Modal Closed");
  }
}