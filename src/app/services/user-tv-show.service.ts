import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, userTvShowEndpoints } from '../constants/endpoints';
import { UserTvShow } from '../interfaces/UserTvShow';
import { UserTvShowEntity } from '../interfaces/UserTvShowEntity';

@Injectable({
  providedIn: 'root'
})
// Done.
export class UserTvShowService {
  constructor(private http: HttpClient) { }

  /* We send a userTvShow to the server so we can saved it. */
  saveUserTvShow(userTvShow: UserTvShowEntity): Observable<UserTvShow> {
    return this.http.post<UserTvShow>(baseUrl+ `${userTvShowEndpoints.SAVE_USER_TVSHOW}`, userTvShow);
  }
}
