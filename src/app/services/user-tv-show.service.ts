import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, userTvShowEndpoints } from '../constants/endpoints';
import { UserTvShow } from '../interfaces/UserTvShow';
import { UserTvShowEntity } from '../interfaces/UserTvShowEntity';
import { UserTvShowPatchDTO } from '../interfaces/UserTvShowPatchDTO';

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

   /* Updates a user tv show based on the info in UserTvShowPatchDTO object. */
   updateUserTvShow(userTvShowToupdate: UserTvShowPatchDTO, idUserTvShow: number) : Observable<void> {
    return this.http.patch<void>(baseUrl+ `${userTvShowEndpoints.UPDATE_USER_TVSHOW}${idUserTvShow}`, userTvShowToupdate);
  }
}
