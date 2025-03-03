import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DepCreateComponent } from '../dep-create/dep-create.component';
import { CommonModule } from '@angular/common';
import { PerformanceCreateComponent } from '../performance-create/performance-create.component'; // Import PerformanceCreateComponent
import { EmployeeCreateComponent } from '../employee-create/employee-create.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, EmployeeCreateComponent, DepCreateComponent, PerformanceCreateComponent], // Add PerformanceCreateComponent
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  showUpdateForm = false;
  employeeIdToUpdate: number | null = null;

  @ViewChild(PerformanceCreateComponent) performanceCreateComponent!: PerformanceCreateComponent; // Add ViewChild

  constructor(private router: Router) { }

  logout(): void {
    sessionStorage.removeItem('yourSessionKey');
    this.router.navigate(['/login']);
  }

  goToEmployees(): void {
    this.router.navigate(['/employees']);
  }

  openPerformanceModal() {
    this.performanceCreateComponent.openModal();
  }

  onPerformanceModalClosed() {
    // This method is called when the performance modal is closed.
    // You can add logic here to refresh any data in the admin component if needed.
  }
}