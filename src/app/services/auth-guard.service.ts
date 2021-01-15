import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

// The canActivate method returns a boolean indicating whether or not navigation to a route should be allowed. 
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  // If user is logged in and its id role is 1 (USER), we let them pass to the route.
  // If not , we are protecting this route, we make a logOut and redirect to logIn route.
  canActivate(): boolean {
    if(this.authService.isLoggedIn() &&  this.authService.getUserRoleromLocalStorage() === 1)
      return true;

    this.authService.logout();
    this.router.navigate(['logIn']);
    return false;
  }
}
