import { HttpClient, HttpParams } from '@angular/common/http';
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
export class TvShowRemindersService {

  /* GET tv shows reminders from the server */
  getTvShowRemindersPaginated(page: number, size:number): Observable<PageResponseReminder> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString()); 

    return this.http.get<PageResponseReminder>(baseUrl+ `${tvShowReminderEndpoints.REMINDERDS_PAGINATED}`, {params});/*.pipe( 
      tap((result) => console.log(result)) 
    );*/
  }

  saveTvShowReminder(tvShowReminder : TvShowReminderEntity): Observable<TvShowReminder> {
    return this.http.post<TvShowReminder>(baseUrl+ `${tvShowReminderEndpoints.SAVE_REMINDER}`, tvShowReminder);/*.pipe(
      tap((result) => {
        console.log("Saving tv show reminder entity, we get from the service its DTO: ")
        console.log(result)
      }) 
    );;*/
  }

  updateTvShowReminder(tvShowReminderToUpdate: TvShowReminderPatchDTO, idTvShowReminder: number): Observable<TvShowReminder> {
    return this.http.patch<TvShowReminder>(baseUrl+ `${tvShowReminderEndpoints.UPDATE_REMINDER}${idTvShowReminder}`, tvShowReminderToUpdate);/*.pipe(
      tap((result) => {
        console.log("Updating, we get from the service its DTO reminder: ")
        console.log(result)
      }) 
    );*/
  }

  constructor(private http: HttpClient) { }
}
