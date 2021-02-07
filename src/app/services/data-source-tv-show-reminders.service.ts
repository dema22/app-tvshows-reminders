import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TvShowReminder } from '../interfaces/TvShowReminder';
import { TvShowReminderEntity } from '../interfaces/TvShowReminderEntity';
import { TvShowRemindersService } from './tv-show-reminders.service';

@Injectable({
  providedIn: 'root',
})
export class DataSourceTvShowRemindersService
  implements DataSource<TvShowReminder> {
  private totalElementsForPagination = new BehaviorSubject<number>(0);
  public readonly totalElementsForPagination$: Observable<number> = this.totalElementsForPagination.asObservable();
  private tvShowRemindersSubject = new BehaviorSubject<TvShowReminder[]>([]);
  public readonly tvShowReminder$: Observable<
    TvShowReminder[]
  > = this.tvShowRemindersSubject.asObservable();

  constructor(private tvShowReminderService: TvShowRemindersService) {}

  loadReminders(page: number, size: number) {
    this.tvShowReminderService
      .getTvShowRemindersPaginated(page, size)
      .pipe(tap((reminders) => console.log(reminders)))
      .subscribe((pageReminder) => {
        if (pageReminder != null) {
          this.tvShowRemindersSubject.next(pageReminder.items);
          this.totalElementsForPagination.next(
            pageReminder.pageDescriptionDTO.totalElements
          );
        }
      });
  }

  // This method will be called once by the Data Table at table bootstrap time. The Data Table expects this method to return an Observable, and the values of that observable contain the data that the Data Table needs to display.
  // This method returns an Observable that emits the reminders data.. we don't want to expose the internal subject tvShowRemindersSubject directly.
  // This gives the data table (or any other subscriber) the ability to subscribe to the reminders data observable, without being able to emit values for that same observable.
  connect(collectionViewer: CollectionViewer): Observable<TvShowReminder[]> {
    console.log('Connecting data source');
    return this.tvShowRemindersSubject.asObservable();
  }

  // This method is called once by the data table at component destruction time. Also are going to complete any observables that we have created internally in this class, in order to avoid memory leaks.
  disconnect(collectionViewer: CollectionViewer): void {
    this.tvShowRemindersSubject.complete();
  }

  // We are going to push the reminder if the page size has not been fill yet.
  // We Get the reminders array from the subject, push reminder into our copy's array, apply the local updated array value as our new array of Reminders Subject
  // We always update the count of elements for the paginator.

  saveReminderInDataSource(reminder: TvShowReminder, pageSize: number): void {
    //console.log("Array lenght: ");
    //console.log(this.tvShowRemindersSubject.getValue().length);

    //console.log(this.tvShowRemindersSubject.getValue().length);
    //console.log(pageSize);

    if (this.tvShowRemindersSubject.getValue().length < pageSize) {
      console.log('INSERT DATA SOURCE');
      let tvShowReminders = this.tvShowRemindersSubject.getValue();
      tvShowReminders.push(reminder);
      this.tvShowRemindersSubject.next(tvShowReminders);
    }
    this.updateCountElementsForPaginator();
  }

  // We are going to search in the subject array to find this reminder that has been updated.
  // We replace it we the latest information.
  updateReminderInDataSource(reminder: TvShowReminder, pageSize: number): void {
    console.log('UPDATE DATA SOURCE');
    let tvShowReminders = this.tvShowRemindersSubject.getValue();
    let searchReminderIndex = tvShowReminders.findIndex(
      (searchReminder) =>
        searchReminder.idTvShowReminder === reminder.idTvShowReminder
    );
    tvShowReminders[searchReminderIndex] = reminder;
    this.tvShowRemindersSubject.next(tvShowReminders);
  }

  deleteReminderFromDataSource(reminder: TvShowReminder, pageSize: number): void {
    console.log('DELETE REMINDER FROM DATA SOURCE');
    console.log(this.tvShowRemindersSubject.getValue().length);

    let tvShowReminders = this.tvShowRemindersSubject.getValue();
    let reminderIndex = tvShowReminders.findIndex((searchReminder) => searchReminder.idTvShowReminder === reminder.idTvShowReminder);
    tvShowReminders.splice(reminderIndex,1); 
    this.tvShowRemindersSubject.next(tvShowReminders);


    console.log(pageSize);
    console.log(this.totalElementsForPagination.getValue());

    let pagination = this.totalElementsForPagination.getValue();
    pagination -= 1;
    this.totalElementsForPagination.next(pagination);

    if(this.tvShowRemindersSubject.getValue().length === 0){
      console.log("Si hay un elemento y lo elimino, debo recargar la pagina anterior");
      //this.loadReminders(0,pageSize);
    }
  }

  // We increment the count elements for paginator.
  updateCountElementsForPaginator() {
    let pagination = this.totalElementsForPagination.getValue();
    pagination += 1;
    this.totalElementsForPagination.next(pagination);
  }
}
