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
    private emitChangeSourceForReminder = new Subject<TvShowReminderEmitted>();
    changeEmittedForReminder$   = this.emitChangeSourceForReminder.asObservable();

    private emitChangeSourceForReminderArray = new Subject<TvShowReminder[]>();
    changeEmittedForReminderArray$   = this.emitChangeSourceForReminderArray.asObservable();

    emitReminderArray(emmitedReminders: TvShowReminder[]) {
      this.emitChangeSourceForReminderArray.next(emmitedReminders);
    }

    emitReminder(emmitedReminder: TvShowReminderEmitted) {
      this.emitChangeSourceForReminder.next(emmitedReminder);
    }
}
