import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../model/interface/reg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'register',
  imports: [FormsModule,CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  roles = 'user';
  registrationMessage = '';
  registrationError = false;
 
  constructor(private router: Router, private authService: AuthService) {} // Inject AuthService
 
  register() {
    if (this.password !== this.confirmPassword) {
      this.registrationMessage = 'Passwords do not match.';
      this.registrationError = true;
      return;
    }
 
    const user: User = {
     
      name: this.name,
      email: this.email,
      password: this.password,
      roles: this.roles,
    };
 
    this.authService.register(user).subscribe(
      (response: string) => {
        // debugger;
        console.log('Registration response:', response);
        this.registrationMessage = response;
        this.registrationError = false;
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      (error) => {
        // debugger;
        console.error('Registration failed:', error);
        this.registrationMessage = 'Registration failed. Please try again.';
        this.registrationError = true;
      }
    );
  }
}

