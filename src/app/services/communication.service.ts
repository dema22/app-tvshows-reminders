import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TvShowReminder } from '../interfaces/TvShowReminder';
import { TvShowReminderEmitted } from '../interfaces/TvShowReminderEmitted';

@Injectable({
  providedIn: 'root'
})
// Done.
// We created a channel of comunication to emit objects from the child components to the part components.
export class CommunicationService {

  constructor() { }
    private emitChangeSourceForReminder = new Subject<TvShowReminderEmitted>();
    changeEmittedForReminder$   = this.emitChangeSourceForReminder.asObservable();

    private emitChangeSourceForReminderArray = new Subject<TvShowReminder[]>();
    changeEmittedForReminderArray$   = this.emitChangeSourceForReminderArray.asObservable();

    // To emit a tvshowreminder array when we delete a reminder.
    emitReminderArray(emmitedReminders: TvShowReminder[]) {
      this.emitChangeSourceForReminderArray.next(emmitedReminders);
    }

    // To emit the emmitedReminder we are creating or updating.
    emitReminder(emmitedReminder: TvShowReminderEmitted) {
      this.emitChangeSourceForReminder.next(emmitedReminder);
    }
}
