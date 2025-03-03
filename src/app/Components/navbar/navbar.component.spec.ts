import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  password: string = ''; // Initialize password with an empty string

  constructor(private router: Router) { }

  ngOnInit(): void {
    const storedPassword = localStorage.getItem("password"); // Get password from local storage

    if (storedPassword === "Sufiyan") { // Check stored password
      this.isLoggedIn = true;
      this.password = storedPassword; // Assign the value to the password property
    }
  }
  
  handleLogout(){
    localStorage.removeItem("password");
    localStorage.removeItem("username");
    this.isLoggedIn=false;
    alert("Logged Out Success")
    this.router.navigate(['/'])
  }
}