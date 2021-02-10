import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PageResponseReminder } from '../interfaces/PageResponseReminder';
import { TvShowReminder } from '../interfaces/TvShowReminder';
import { TvShowReminderEmitted } from '../interfaces/TvShowReminderEmitted';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor() { }

    private emitChangeSourceForSavingReminder = new Subject<TvShowReminder>();
    private emitChangeSourceForUpdatingReminder = new Subject<TvShowReminder>();
    private emitChangeSourceForDeletingReminder = new Subject<TvShowReminder>();


    changeEmittedForSavingReminder$   = this.emitChangeSourceForSavingReminder.asObservable();
    changeEmittedForUpdatingReminder$ = this.emitChangeSourceForUpdatingReminder.asObservable();
    changeEmittedForDeletingReminder$ = this.emitChangeSourceForDeletingReminder.asObservable();

    private emitChangeSourceForReminder = new Subject<TvShowReminderEmitted>();
    changeEmittedForReminder$   = this.emitChangeSourceForReminder.asObservable();

    private emitChangeSourceForPageReminder = new Subject<PageResponseReminder>();
    changeEmittedForPageReminder$   = this.emitChangeSourceForPageReminder.asObservable();

    emitReminder(emmitedReminder: TvShowReminderEmitted) {
      this.emitChangeSourceForReminder.next(emmitedReminder);
    }

    emitPageReminders(emittedPageReminder: PageResponseReminder){
      this.emitChangeSourceForPageReminder.next(emittedPageReminder);
    }
    
    emitChangeWhenSavingReminder(reminder: TvShowReminder) {
        this.emitChangeSourceForSavingReminder.next(reminder);
    }

    emitChangeWhenUpdatingReminder(reminder: TvShowReminder) {
      this.emitChangeSourceForUpdatingReminder.next(reminder);
    }

    emitChangeWhenDeletingReminder(reminder: TvShowReminder) {
      this.emitChangeSourceForDeletingReminder.next(reminder);
    }
}
