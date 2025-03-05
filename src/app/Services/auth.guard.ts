import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {const authService = inject(AuthService);
  const router = inject(Router);
 
  if (authService.isAuthenticated()) {
    return true; // User is authenticated, allow access
  } else {
    router.navigate(['/login']); // User is not authenticated, redirect to login
    return false; // Prevent access to the route
  }
};
