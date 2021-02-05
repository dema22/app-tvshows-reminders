import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, userTvShowEndpoints } from '../constants/endpoints';
import { UserTvShow } from '../interfaces/UserTvShow';
import { UserTvShowEntity } from '../interfaces/UserTvShowEntity';

@Injectable({
  providedIn: 'root'
})
export class UserTvShowService {
  constructor(private http: HttpClient) { }

  /* Send the user information from the registration to the server */
  saveUserTvShow(userTvShow: UserTvShowEntity): Observable<UserTvShow> {
    return this.http.post<UserTvShow>(baseUrl+ `${userTvShowEndpoints.SAVE_USER_TVSHOW}`, userTvShow);
  }
}
