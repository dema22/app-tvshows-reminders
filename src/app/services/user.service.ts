import { Injectable } from '@angular/core';

// Communicating with backend services using HTTP angular client
import { HttpClient} from '@angular/common/http';

// Importing operators from rxjs library 
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Importing interfaces:
import { UserProfile } from '../interfaces/UserProfile';
import { User } from '../interfaces/User';

// Import URIS of my User Controller API
import { baseUrl, userEndpoints} from '../constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /* Send the user information from the registration to the server */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(baseUrl+ `/${userEndpoints.ADD_USER}`, user);
  }

  // Get profile of the logged user
  getUserProfile(): Observable<UserProfile> {
    console.log("entra a buscar user profile");
    return this.http.get<UserProfile>(baseUrl+ `/${userEndpoints.PROFILE}`).pipe(
      tap((profileResult) => console.log(profileResult))
    );
  }
  constructor(private http: HttpClient) { }
}
