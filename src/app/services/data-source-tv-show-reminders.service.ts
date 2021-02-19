import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PageInfo } from '../interfaces/PageInfo';
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

  private goToPageSubject: BehaviorSubject<PageInfo> = new BehaviorSubject<PageInfo>({pageIndex: null, pageSize: null, length: null});
  public readonly goToPage$ : Observable<PageInfo> = this.goToPageSubject.asObservable();

  constructor(private tvShowReminderService: TvShowRemindersService) {}

  // This function we load a reminder page of the size the user want.
  // We call the service to get this page information.
  // If we get reminders we will store them in the subject and will store the total elements for the pagination.
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
    //console.log('Connecting data source');
    return this.tvShowRemindersSubject.asObservable();
  }

  // This method is called once by the data table at component destruction time. Also are going to complete any observables that we have created internally in this class, in order to avoid memory leaks.
  disconnect(collectionViewer: CollectionViewer): void {
    this.tvShowRemindersSubject.complete();
  }

  // If the user save a reminder, we will manage this reminder, meaning saving in the data source.
  // The same when the user update a reminder.
  manageEmmitedReminder(emittedReminder: TvShowReminderEmitted, pageSize: number, currentPage: number) : void {
    if(emittedReminder.emittedOperation === 'save')
      this.saveReminderInDataSource(emittedReminder.tvShowReminder, pageSize);
    else if(emittedReminder.emittedOperation === 'update')
      this.updateReminderInDataSource(emittedReminder.tvShowReminder);
  }

  // We are going to push the reminder if the page size has not been fill yet.
  // If the page doesnt have space, we will look for the last page, and create a PageInfo object with the information in  which page the reminder is going to be added.
  // After that, we just load the reminders for that page we calculate.

  saveReminderInDataSource(reminder: TvShowReminder, pageSize: number): void {
    // We always update the total elements, because we are adding a new reminder to the total.
    this.updateCountElementsForPaginator();

    // if we have space in the current page we just push the reminder to the subject.
    if (this.tvShowRemindersSubject.getValue().length < pageSize) {
      let tvShowReminders = this.tvShowRemindersSubject.getValue();
      tvShowReminders.push(reminder);
      this.tvShowRemindersSubject.next(tvShowReminders);
    }else if(this.tvShowRemindersSubject.getValue().length === pageSize) { // If the page doesnt have more space, i will look for an empty page.
      let totalElements = this.totalElementsForPagination.getValue(); // 4 : 3 = 2 - 1 = 1 -> go to page 1 // 10 : 3 = 4 -1 = 3 -> go to page 3.
      let lastPage = Math.ceil(totalElements / pageSize) - 1;
      console.log(lastPage);
      this.goToPageSubject.next({
        pageIndex: lastPage,
        pageSize: pageSize,
        length: totalElements
      });
      this.loadReminders(lastPage, pageSize);
    }
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

  // When a reminder is being delete we get from the back end the rest of reminder that page has.
  // So if we have a list of reminders we just assign it to the array subject.
  // If we dont get any array we empty the content int the array subject.
  // Finally we need to pay attention to a special case, when the user delete the last reminder of a page.
  // We are going to go to the previous page. For this we are going to create a PageInfo object to hold this information and then reload the information
  // of this previous page.
  deleteReminderFromDataSource(reminder: TvShowReminder[], pageSize: number, currentPage: number): void {
    console.log("enter function current page is : " + currentPage);
    // Array from subject
    let tvShowReminder = this.tvShowRemindersSubject.getValue();
    let totalElements = this.tvShowRemindersSubject.getValue().length;

    // If we get a list of reminder we assign it to the subject array.
    // Else we delete the content of the array.
    if(reminder.length > 0){
      tvShowReminder = reminder;
      this.tvShowRemindersSubject.next(tvShowReminder);
      console.log(this.tvShowRemindersSubject.getValue());
    }else{
      console.log("ELSE DE DELETE");
      tvShowReminder.splice(0,tvShowReminder.length);
      this.tvShowRemindersSubject.next(tvShowReminder);
    }

    // decrement one reminder from the total count
    this.decrementCountElementsForPaginator();

    // If the current page is empty and its not the first page.
    // We are going to reload the previous page.
    if(reminder.length  === 0 && currentPage !== 0) { 
      console.log("Reminder length: " + reminder.length + " and current page is : " + currentPage);
      currentPage -= 1;
      console.log("movete a la anterior : " + currentPage);
      //this.goToPreviousPageSubject.next(!this.goToPreviousPageSubject.getValue());
      this.goToPageSubject.next({
        pageIndex: currentPage,
        pageSize: pageSize,
        length: totalElements
      });
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
