import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { baseUrl, tvShowReminderEndpoints } from '../constants/endpoints';
import { PageResponseReminder } from '../interfaces/PageResponseReminder';

@Injectable({
  providedIn: 'root'
})
export class TvShowRemindersService {

  /* GET tv shows reminders from the server */
  getTvShowRemindersPaginated(page: number, size:number): Observable<PageResponseReminder> {//  any
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString()); // ?page=${page}&size=${size}`

    return this.http.get<PageResponseReminder>(baseUrl+ `${tvShowReminderEndpoints.REMINDERDS_PAGINATED}`, {params}).pipe( //  any
      tap((result) => console.log(result)) 
    );
  }

  constructor(private http: HttpClient) { }
}
