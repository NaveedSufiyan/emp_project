import { Department } from "./department";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  departmentCode: string;
  performanceId: number;
}

export interface EmployeeWithPerformance {
  employee: Employee;
  performance: {
    id: number;
    title: string;
    description: string;
    rating: number;
  };
}


