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
    if (this.departmentForm.valid) {
      this.loading = true;
      this.error = null;
      this.successMessage = null;

      this.departmentService.createDepartment(this.departmentForm.value).subscribe({
        next: (createdDepartment) => {
          this.loading = false;
          alert('Department created!');
          this.departmentForm.reset();
          this.closeModal();
        },
        error: (error) => {
          this.loading = false;
          this.error = 'An error occurred while creating the department.';
          console.error(error);
        }
      });
    } else {
      this.error = 'Please fill in all required fields.';
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