import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../Services/department.service';

@Component({
  selector: 'app-dep-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dep-create.component.html',
  styleUrls: ['./dep-create.component.css']
})
export class DepCreateComponent {
  departmentForm: FormGroup;
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;
  showModal = false;

  constructor(private fb: FormBuilder, private departmentService: DepartmentService) {
    this.departmentForm = this.fb.group({
      departmentName: ['', Validators.required],
      departmentDescription: ['', Validators.required],
      departmentCode: ['', Validators.required]
    });
  }

  createDepartment(): void {
    if (this.departmentForm.valid) { // first it will check if form is valid
      this.loading = true;  // Sets loading to true to indicate request in progress
      this.error = null; // Clears any previous error messages
      this.successMessage = null; // Clears any previous success messages

  // Calls the DepartmentService to create a department and subscribes to the observable
      this.departmentService.createDepartment(this.departmentForm.value).subscribe({  
     
        next: (createdDepartment) => {
          // After the successful department creation
          this.loading = false; // Sets loading to false
          alert('Department created!'); 
          this.departmentForm.reset(); // Resets the form
          this.closeModal();
        },
        error: (error) => {
          this.loading = false;
          this.error = 'An error occurred while creating the department.';
          console.error(error);
        }
      });
    } else {
      this.error = 'Please fill in all required fields.'; //If forms details are incorrect
    }
  }

  openModal(): void {  
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.departmentForm.reset();
    this.error = null;
    this.successMessage = null;
  }
}