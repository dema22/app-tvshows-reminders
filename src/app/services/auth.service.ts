import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from '../interfaces/Credentials';

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
    return this.http.post<AuthResponse>(baseUrl+ `/${userEndpoints.LOGIN}`, userCredentials);
  }
}