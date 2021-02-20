import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStoreService } from './auth-store.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
// Done
// The canActivate method returns a boolean indicating whether or not navigation to a route should be allowed. 
export class AuthGuardService implements CanActivate {

  constructor(private authStore: AuthStoreService, private router: Router) { }

  // If user is logged in and its id role is 1 (USER), we let them pass to the route.
  // If not , we are protecting this route, we make a logOut and redirect to logIn route.
  canActivate(): boolean {
    //this.authStore.isLoggedIn();
    //console.log(this.authStore.isLoggedIn$);
    if(this.authStore.isLoggedIn() &&  this.authStore.getUserRoleromLocalStorage() === 1)
      return true;

    this.authStore.logout();
    this.router.navigate(['logIn']);
    return false;
  }
}
