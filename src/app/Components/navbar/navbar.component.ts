import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserpageComponent } from '../userpage/userpage.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  role: string | null = 'user'; // Initialize with a default role
 
  constructor(private authService: AuthService, private service: AuthService, private router: Router) { } 
 
  ngOnInit(): void {
    this.role = this.authService.getUserRole();
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
    }
    this.router.navigate(['/login']);
  }

}