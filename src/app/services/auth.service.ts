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
// Done
export class AuthService {

  constructor(private http: HttpClient) { }

  // This method will try to log in with our api, in case of success, it will return the token.
  logIn(userCredentials: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(baseUrl+ `/${userEndpoints.LOGIN}`, userCredentials);
  }
}