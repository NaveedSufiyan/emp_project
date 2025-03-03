import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const UserRole = authService.getUserRole();

  if (UserRole==='admin'&& authService.isAuthenticated()) {
    console.log(UserRole)
    return true; // User is authenticated, allow access
  } else {
    router.navigate(['/login']); // User is not authenticated, redirect to login
    return false; // Prevent access to the route
  }
};
