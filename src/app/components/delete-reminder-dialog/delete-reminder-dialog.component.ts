import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TvShowReminder } from 'src/app/interfaces/TvShowReminder';
import { CommunicationService } from 'src/app/services/communication.service';
import { TvShowRemindersService } from 'src/app/services/tv-show-reminders.service';

@Component({
  selector: 'app-delete-reminder-dialog',
  templateUrl: './delete-reminder-dialog.component.html',
  styleUrls: ['./delete-reminder-dialog.component.css']
})
// Done.
export class DeleteReminderDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteReminderDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {reminder: TvShowReminder, pageIndex: number, pageSize: number},
              private tvShowReminderService : TvShowRemindersService,
              private communicationService: CommunicationService) { }

  ngOnInit(): void {
  }

  // The service deletes the reminder and returns the rest of the reminders there is in the pageIndex with that pageSize.
  deleteReminder(){
    this.tvShowReminderService.deleteTvShowReminder(this.data.reminder.idTvShowReminder, this.data.pageIndex, this.data.pageSize).subscribe((reminders) => {
      let reminderList: TvShowReminder[] = [];
      // I emit the reminders array from the service or if it returns null i emit an empty reminder list.
      reminders !== null ? this.communicationService.emitReminderArray(reminders) : this.communicationService.emitReminderArray(reminderList);
      this.dialogRef.close();
    });
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
}
