import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'employee-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {
  employeeForm: FormGroup;
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;
  showModal = false;
  isEditMode = false;
  employeeIdToUpdate: number | null = null;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      departmentCode: [''],
      performanceId: ['']
    });
  }

  submitEmployee(): void {
    if (this.isEditMode) {
      this.updateEmployee();
    } else {
      this.createEmployee();
    }
  }

  createEmployee(): void {
    if (this.employeeForm.valid) {
      this.loading = true;
      this.error = null;
      this.successMessage = null;

      this.employeeService.createEmployee(this.employeeForm.value).subscribe({
        next: (createdEmployee) => {
          this.loading = false;
          alert('Employee created!');
          this.employeeForm.reset();
          this.closeModal();
        },
        error: (error) => {
          this.loading = false;
          this.error = 'An error occurred while creating the employee.';
          console.error(error);
        }
      });
    } else {
      this.error = 'Please fill in all required fields.';
    }
  }

  updateEmployee(): void {
    if (this.employeeForm.valid && this.employeeIdToUpdate) {
      this.loading = true;
      this.error = null;
      this.successMessage = null;

      this.employeeService.updateEmployee(this.employeeIdToUpdate, this.employeeForm.value).subscribe({
        next: (updatedEmployee) => {
          this.loading = false;
          alert('Employee updated!');
          this.employeeForm.reset();
          this.closeModal();
        },
        error: (error) => {
          this.loading = false;
          this.error = 'An error occurred while updating the employee.';
          console.error(error);
        }
      });
    } else {
      this.error = 'Please fill in all required fields.';
    }
  }

  openModal(editMode: boolean = false, employeeId: number | null = null): void {
    this.isEditMode = editMode;
    this.employeeIdToUpdate = employeeId;

    if (this.isEditMode && this.employeeIdToUpdate) {
      this.employeeService.getEmployee(this.employeeIdToUpdate).subscribe({
        next: (employee) => {
          this.employeeForm.patchValue(employee);
          this.showModal = true;
        },
        error: (error) => {
          console.error('Error fetching employee:', error);
          this.error = 'Error fetching employee data.';
        }
      });
    } else {
      this.showModal = true;
      if (!this.isEditMode) {
         this.employeeForm.reset();
      }
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.employeeForm.reset();
    this.error = null;
    this.successMessage = null;
    this.isEditMode = false;
    this.employeeIdToUpdate = null;
  }

  toggleMode(): void {
    this.isEditMode = !this.isEditMode;
    this.employeeForm.reset();
    this.employeeIdToUpdate = null;
  }
}