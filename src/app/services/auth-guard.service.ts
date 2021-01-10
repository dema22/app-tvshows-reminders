import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

// The canActivate method returns a boolean indicating whether or not navigation to a route should be allowed. 
// If the user isn’t authenticated, they are re-routed to some other place, in this case to the route called /login.

export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  // Is not logged in, we log out the current user and redirect to log in url.
  canActivate(): boolean {
    if(!this.authService.isLoggedIn()){
      //console.log("Te fuiste log in pa");
      this.authService.logout();
      this.router.navigate(['logIn']);
      return false;
    }
    //console.log("Te dejo pasar por la ruta paaa");
    return true;
  }
}
