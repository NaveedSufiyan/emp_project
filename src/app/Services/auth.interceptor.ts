import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

// Define an HTTP interceptor function
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  // Inject the AuthService to get the authentication token
  const authService = inject(AuthService);
  const token = authService.getToken();
  console.log("Interceptor..." + token); // Log the token for debugging purposes

  // If a token is available, clone the request and add the Authorization header
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });
    return next(authReq); // Pass the modified request to the next handler
  } else {
    return next(req); // If no token, pass the original request to the next handler
  }
};