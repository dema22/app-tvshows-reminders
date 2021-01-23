import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TvShowReminders } from '../interfaces/TvShowReminders';
import { TvShowRemindersService } from './tv-show-reminders.service';

@Injectable({
  providedIn: 'root',
})
export class DataSourceTvShowRemindersService implements DataSource<TvShowReminders> {

  private tvShowRemindersSubject = new BehaviorSubject<TvShowReminders[]>([]);
  
  constructor(private tvShowReminderService: TvShowRemindersService) {}

  loadReminders(page: number, size:number) {
    this.tvShowReminderService.getTvShowRemindersPaginated(page,size).pipe(
      tap((reminders) => console.log(reminders))     
    ).subscribe((pageReminder) => this.tvShowRemindersSubject.next(pageReminder.items));
  }

  // This method will be called once by the Data Table at table bootstrap time. The Data Table expects this method to return an Observable, and the values of that observable contain the data that the Data Table needs to display.
  // This method returns an Observable that emits the reminders data.. we don't want to expose the internal subject tvShowRemindersSubject directly.
  // This gives the data table (or any other subscriber) the ability to subscribe to the reminders data observable, without being able to emit values for that same observable.
  connect(collectionViewer: CollectionViewer): Observable<TvShowReminders[]> {
    console.log('Connecting data source');
    return this.tvShowRemindersSubject.asObservable();
  }

  // This method is called once by the data table at component destruction time. Also are going to complete any observables that we have created internally in this class, in order to avoid memory leaks.
  disconnect(collectionViewer: CollectionViewer): void {
    this.tvShowRemindersSubject.complete();
  }
}
