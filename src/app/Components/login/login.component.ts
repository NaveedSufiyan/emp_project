import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'login',
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
 
  constructor(private authService: AuthService, private router: Router) {}
 
  login() {  //Login Method 
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      (response) => {
        console.log('Login successful', response);
        // Access token and userId from the response
        const token = response.token;  //Extract token from the response.
        const userId = response.userId; //Extract user id from the response.
        console.log('Token:', token);
        console.log('User ID:', userId);
 
        this.router.navigate(['/home']); //After Login it will go to home page
      },
      (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
 
}