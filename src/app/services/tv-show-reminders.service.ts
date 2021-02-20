import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { baseUrl, tvShowReminderEndpoints } from '../constants/endpoints';
import { PageResponseReminder } from '../interfaces/PageResponseReminder';
import { TvShowReminder } from '../interfaces/TvShowReminder';
import { TvShowReminderEntity } from '../interfaces/TvShowReminderEntity';
import { TvShowReminderPatchDTO } from '../interfaces/TvShowReminderPatchDTO';

@Injectable({
  providedIn: 'root'
})
// Done.
export class TvShowRemindersService {

  /* GET tv shows reminders from the server with pagination.*/
  getTvShowRemindersPaginated(page: number, size:number): Observable<PageResponseReminder> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString()); 

    return this.http.get<PageResponseReminder>(baseUrl+ `${tvShowReminderEndpoints.REMINDERDS_PAGINATED}`, {params});/*.pipe( 
      tap((result) => console.log(result)) 
    );*/
  }

  /* Save a TvShowReminderEntity and returns the TvShowReminder we just created based on the entity. */
  saveTvShowReminder(tvShowReminder : TvShowReminderEntity): Observable<TvShowReminder> {
    return this.http.post<TvShowReminder>(baseUrl+ `${tvShowReminderEndpoints.SAVE_REMINDER}`, tvShowReminder);/*.pipe(
      tap((result) => {
        console.log("Saving tv show reminder entity, we get from the service its DTO: ")
        console.log(result)
      }) 
    );;*/
  }

  /* Updates a reminder based on the info in TvShowReminderPatchDTO object. It will return the TvShowReminder updated. */
  updateTvShowReminder(tvShowReminderToUpdate: TvShowReminderPatchDTO, idTvShowReminder: number): Observable<TvShowReminder> {
    return this.http.patch<TvShowReminder>(baseUrl+ `${tvShowReminderEndpoints.UPDATE_REMINDER}${idTvShowReminder}`, tvShowReminderToUpdate);/*.pipe(
      tap((result) => {
        console.log("Updating, we get from the service its DTO reminder: ")
        console.log(result)
      }) 
    );*/
  }

  /* It deletes a tv show reminder. And it returns a tv show reminder array with the rest of reminder we have on that page index and page size.
  If we dont have any reminder in that page, it returns null. */
  deleteTvShowReminder(idTvShowReminder: number, pageIndex: number, pageSize: number) : Observable<TvShowReminder[]> {
    
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        pageIndex: pageIndex,
        size: pageSize
      }, 
    };

    return this.http.delete<TvShowReminder[]>(baseUrl+ `${tvShowReminderEndpoints.DELETE_REMINDER}${idTvShowReminder}`, options);
  }

  constructor(private http: HttpClient) { }
}
