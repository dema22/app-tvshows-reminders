import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Credentials } from '../interfaces/Credentials';
import { Token } from '../interfaces/Token';
import jwt_decode from 'jwt-decode';

// Import URIS of my User Controller API
import { baseUrl, userEndpoints} from '../constants/endpoints';
import { AuthResponse } from '../interfaces/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // This method will try to log in with our api, in case of success, it will return the token.
  // We will get the expiration time from the token, and after that set the session of this logged user storing the token in the local storage.
  logIn(userCredentials: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(baseUrl+ `/${userEndpoints.LOGIN}`, userCredentials).pipe(
      tap((authResult) => { 
        console.log(authResult);
        const expirationTime = this.getExpirationTimeFromToken(authResult);
        this.setSession(expirationTime, authResult);
      })
    );
  }

  // We decoded the token and return its expiration time in seconds.
  private getExpirationTimeFromToken(authResult) : number {
    const decodedToken = jwt_decode<Token>(authResult.token);
    const expirationTime : number = decodedToken.exp;
    console.log(decodedToken);
    console.log("Exp in seconds : " + expirationTime);
    return expirationTime;
  }

  // We store the token and its expiration time in localStorage entries.
  private setSession(expirationTime : number, authResult) : void {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expirationTime));
  }

  public logout() : void {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
  }

  // We check if the current date hasnt passed the expiration date: if true es valid, else the token has expired.
  public isLoggedIn() : boolean {
      let currentDateInSeconds : number = Math.trunc(Date.now() / 1000); // The number of seconds since the Unix Epoch, This value is floored to the nearest second, and does not include a milliseconds component.
      let expirationTimeInSeconds : number =  this.getExpirationTimeFromLocalStorage();
      console.log("Exp time from local storage is : " + expirationTimeInSeconds);
      console.log("Current date is: "  + currentDateInSeconds);
      //console.log(moment().unix());
      return (currentDateInSeconds <= expirationTimeInSeconds) ? true : false;
  }

  public isLoggedOut() : boolean {
      return !this.isLoggedIn();
  }

  private getExpirationTimeFromLocalStorage() : number {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return expiresAt;
  }
}