import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse
import { PerformanceService } from '../../Services/performance.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'performance-create',
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  templateUrl: './performance-create.component.html',
  styleUrls: ['./performance-create.component.css']
})
export class PerformanceCreateComponent {
  showModal = false;
  performanceForm: FormGroup;

  @Output() modalClosed = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private performanceService: PerformanceService) {
    this.performanceForm = this.fb.group({
      id: ['', [Validators.required, Validators.min(1)]],
      title: ['', Validators.required],
      description: [''],
      rating: ['',[Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.performanceForm.reset();
    this.modalClosed.emit();
  }

  createPerformance() {
    if (this.performanceForm.valid) {
      const performance: Performance = this.performanceForm.value;
      this.performanceService.createPerformance(performance).subscribe(
        () => {
          this.closeModal();
        },
        (error: HttpErrorResponse) => { // Explicitly type 'error'
          console.error('Error creating performance:', error);
          // Handle error (e.g., display an error message to the user)
        }
      );
    }
  }
}