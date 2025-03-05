import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeWithPerformance } from '../../model/interface/emp';
import { EmployeeService } from '../../Services/employee.service';
import { CommonModule, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Department } from '../../model/interface/department';
import { DepartmentService } from '../../Services/department.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employees',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,UpperCasePipe,LowerCasePipe],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  departments: Department[] = [];
  loading = false;
  error: string | null = null;
  showEmployees = false;
  showDepartments = false;
  departmentNameToSearch = '';
  allEmployees: Employee[] = [];
  showEditModal = false;
  selectedEmployee: Employee | null = null;
  editEmployeeForm: FormGroup;
  isAdmin = false;

  showEditDepartmentModal = false;
  selectedDepartment: Department | null = null;
  editDepartmentForm: FormGroup;

  showEmpPerformance = false;
  performanceIdToSearch: number | null = null;
  employeeWithPerformance: EmployeeWithPerformance | null = null;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.editEmployeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      departmentCode: [''],
      performanceId: ['']
    });

    this.editDepartmentForm = this.fb.group({
      departmentName: ['', Validators.required],
      departmentDescription: [''],
      departmentCode: ['']
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.isAdmin = params['admin'] === 'true';
    });
  }

  toggleView(view: 'employees' | 'departments' | 'empPerformance'): void {
    if (view === 'employees') {
      this.showEmployees = !this.showEmployees;
      this.showDepartments = false;
      this.showEmpPerformance = false;
      if (this.showEmployees) {
        this.loadEmployees();
      }
    } else if (view === 'departments') {
      this.showDepartments = !this.showDepartments;
      this.showEmployees = false;
      this.showEmpPerformance = false;
      if (this.showDepartments) {
        this.loadDepartments();
      }
    } else if (view === 'empPerformance') {
      this.showEmpPerformance = !this.showEmpPerformance;
      this.showEmployees = false;
      this.showDepartments = false;
      this.employeeWithPerformance = null;
      this.performanceIdToSearch = null;
    }
  }

  loadEmployees(): void {
    this.loading = true;
    this.employeeService.getEmployees().subscribe({ //Load EMplolyees from service
      next: (employees) => {
        this.employees = employees;
        this.allEmployees = [...employees];
        this.loading = false;
      },
      error: (error) => {
        this.error = 'An error occurred while fetching employees.';
        this.loading = false;
        console.error(error);
      }
    });
  }

  loadDepartments(): void {
    this.loading = true;
    this.departmentService.getDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'An error occurred while fetching departments.';
        this.loading = false;
        console.error(error);
      }
    });
  }

  searchEmployeesByDepartment(): void {
    if (this.departmentNameToSearch) {
      this.loading = true;
      this.employeeService.getEmployeesByDeptName(this.departmentNameToSearch).subscribe({
        next: (employees) => {
          this.employees = employees;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'An error occurred while fetching employees by department.';
          this.loading = false;
          console.error(error);
        }
      });
    } else {
      this.employees = [...this.allEmployees];
    }
  }

  openEditModal(employee: Employee): void {
    console.log("Edit Employee button clicked");
    this.selectedEmployee = employee;
    this.editEmployeeForm.patchValue(employee);
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedEmployee = null;
    this.editEmployeeForm.reset();
  }

  updateEmployee(): void {
    if (this.editEmployeeForm.valid && this.selectedEmployee) {
      const updatedEmployee = {
        ...this.selectedEmployee,
        ...this.editEmployeeForm.value
      };
      this.employeeService.updateEmployee(updatedEmployee.id, updatedEmployee).subscribe({
        next: () => {
          alert('Employee updated successfully!');
          this.closeEditModal();
          this.loadEmployees();
        },
        error: (error) => {
          console.error('Error updating employee:', error);
          alert('Failed to update employee.');
        }
      });
    }
  }

  openEditDepartmentModal(department: Department): void {
    this.selectedDepartment = department;
    this.editDepartmentForm.patchValue(department);
    this.showEditDepartmentModal = true;
  }

  closeEditDepartmentModal(): void {
    this.showEditDepartmentModal = false;
    this.selectedDepartment = null;
    this.editDepartmentForm.reset();
  }

  updateDepartment(): void {
    if (this.editDepartmentForm.valid && this.selectedDepartment) {
      const updatedDepartment = {
        ...this.selectedDepartment,
        ...this.editDepartmentForm.value
      };
      this.departmentService.updateDepartment(updatedDepartment.departmentCode, updatedDepartment).subscribe({
        next: () => {
          alert('Department updated successfully!');
          this.closeEditDepartmentModal();
          this.loadDepartments();
        },
        error: (error) => {
          console.error('Error updating department:', error);
          alert('Failed to update department.');
        }
      });
    }
  }

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
          this.error = 'Employee Id not FOund.';
          this.loading = false;
          console.error(error);
        }
      });
    }
  }
  // Add deleteEmployee and deleteDepartment methods here
  deleteEmployee(employeeId: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe({
        next: () => {
          alert('Employee deleted successfully!');
          this.loadEmployees();
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          alert('Failed to delete employee.');
        }
      });
    }
  }

  deleteDepartment(departmentId: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(departmentId).subscribe({
        next: () => {
          alert('Department deleted successfully!');
          this.loadDepartments();
        },
        error: (error) => {
          console.error('Error deleting department:', error);
          alert('Failed to delete department.');
        }
      });
    }
  }
}