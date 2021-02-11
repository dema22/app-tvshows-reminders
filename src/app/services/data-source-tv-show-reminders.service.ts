import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TvShowReminder } from '../interfaces/TvShowReminder';
import { TvShowReminderEmitted } from '../interfaces/TvShowReminderEmitted';
import { TvShowRemindersService } from './tv-show-reminders.service';

@Injectable({
  providedIn: 'root',
})
export class DataSourceTvShowRemindersService implements DataSource<TvShowReminder> {
  private totalElementsForPagination = new BehaviorSubject<number>(0);
  public readonly totalElementsForPagination$: Observable<number> = this.totalElementsForPagination.asObservable();
  
  private tvShowRemindersSubject = new BehaviorSubject<TvShowReminder[]>([]);
  public readonly tvShowReminder$: Observable<TvShowReminder[]> = this.tvShowRemindersSubject.asObservable();

  private goToPreviousPageSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly goToPreviousPage$ : Observable<boolean> = this.goToPreviousPageSubject.asObservable();

  constructor(private tvShowReminderService: TvShowRemindersService) {}

  loadReminders(page: number, size: number) {
    this.tvShowReminderService
      .getTvShowRemindersPaginated(page, size)
      //.pipe(tap((reminders) => console.log(reminders)))
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
    //console.log('Connecting data source');
    return this.tvShowRemindersSubject.asObservable();
  }

  // This method is called once by the data table at component destruction time. Also are going to complete any observables that we have created internally in this class, in order to avoid memory leaks.
  disconnect(collectionViewer: CollectionViewer): void {
    this.tvShowRemindersSubject.complete();
  }

  manageEmmitedReminder(emittedReminder: TvShowReminderEmitted, pageSize: number, currentPage: number) : void {
    //console.log(emittedReminder.tvShowReminder);

    if(emittedReminder.emittedOperation === 'save')
      this.saveReminderInDataSource(emittedReminder.tvShowReminder, pageSize);
    else if(emittedReminder.emittedOperation === 'update')
      this.updateReminderInDataSource(emittedReminder.tvShowReminder);
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
      //console.log('INSERT DATA SOURCE');
      let tvShowReminders = this.tvShowRemindersSubject.getValue();
      tvShowReminders.push(reminder);
      this.tvShowRemindersSubject.next(tvShowReminders);
    }
    this.updateCountElementsForPaginator();
  }

  // We are going to search in the subject array to find this reminder that has been updated.
  // We replace it we the latest information.
  updateReminderInDataSource(reminder: TvShowReminder): void {
    //console.log('UPDATE DATA SOURCE');
    let tvShowReminders = this.tvShowRemindersSubject.getValue();
    let searchReminderIndex = tvShowReminders.findIndex(
      (searchReminder) =>
        searchReminder.idTvShowReminder === reminder.idTvShowReminder
    );
    tvShowReminders[searchReminderIndex] = reminder;
    this.tvShowRemindersSubject.next(tvShowReminders);
  }

  manageEmmitedReminderArray(reminders: TvShowReminder[], pageSize: number, currentPage: number) : void {
    this.deleteReminderFromDataSource(reminders,pageSize,currentPage);
  }

  deleteReminderFromDataSource(reminder: TvShowReminder[], pageSize: number, currentPage: number): void {
    // Array from subject
    let tvShowReminder = this.tvShowRemindersSubject.getValue();
    
    // If we get a list of reminder we assign it to the subject array.
    // Else we delete the content of the array.
    if(reminder.length > 0){
      tvShowReminder = reminder;
      this.tvShowRemindersSubject.next(tvShowReminder);
      console.log(this.tvShowRemindersSubject.getValue());
    }else{
      tvShowReminder.splice(0,tvShowReminder.length);
      this.tvShowRemindersSubject.next(tvShowReminder);
    }

    // decrement one reminder from the total count
    this.decrementCountElementsForPaginator();

    // If the current page is empty and its not the first page.
    // We are going to reload the previous page.
    if(reminder.length  === 0 && currentPage !== 0) { 
      currentPage -= 1;
      console.log("movete a la anterior : " + currentPage);
      this.goToPreviousPageSubject.next(!this.goToPreviousPageSubject.getValue());
      this.loadReminders(currentPage,pageSize);
    }
  }

  // We increment the count elements for paginator.
  updateCountElementsForPaginator() {
    let pagination = this.totalElementsForPagination.getValue();
    pagination += 1;
    this.totalElementsForPagination.next(pagination);
  }

  // Decrement the elements count for the paginator.
  decrementCountElementsForPaginator(){
    let pagination = this.totalElementsForPagination.getValue();
    pagination -= 1;
    this.totalElementsForPagination.next(pagination);
  }
}
