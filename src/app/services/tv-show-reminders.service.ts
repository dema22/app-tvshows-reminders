import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { baseUrl, tvShowReminderEndpoints } from '../constants/endpoints';
import { PageResponseReminder } from '../interfaces/PageResponseReminder';
import { TvShowReminderEntity } from '../interfaces/TvShowReminderEntity';
import { TvShowReminders } from '../interfaces/TvShowReminders';

@Injectable({
  providedIn: 'root'
})
export class TvShowRemindersService {

  /* GET tv shows reminders from the server */
  getTvShowRemindersPaginated(page: number, size:number): Observable<PageResponseReminder> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString()); 

    return this.http.get<PageResponseReminder>(baseUrl+ `${tvShowReminderEndpoints.REMINDERDS_PAGINATED}`, {params}).pipe( 
      tap((result) => console.log(result)) 
    );
  }

  saveTvShowReminder(tvShowReminder : TvShowReminderEntity): Observable<TvShowReminderEntity> {
    return this.http.post<TvShowReminderEntity>(baseUrl+ `${tvShowReminderEndpoints.SAVE_REMINDER}`, tvShowReminder);
  }

  constructor(private http: HttpClient) { }
}
