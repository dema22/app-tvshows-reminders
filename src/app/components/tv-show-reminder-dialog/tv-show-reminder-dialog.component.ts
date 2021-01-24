import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BasicTvShowInfo } from 'src/app/interfaces/BasicTvShowInfo';
import { TvShowReminderEntity } from 'src/app/interfaces/TvShowReminderEntity';
import { User } from 'src/app/interfaces/User';
import { AuthStoreService } from 'src/app/services/auth-store.service';
import { TvShowRemindersService } from 'src/app/services/tv-show-reminders.service';

@Component({
  selector: 'app-tv-show-reminder-dialog',
  templateUrl: './tv-show-reminder-dialog.component.html',
  styleUrls: ['./tv-show-reminder-dialog.component.css'],
})
export class TvShowReminderDialogComponent implements OnInit {
  saveReminderForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TvShowReminderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public idTvShow: number,
    private formBuilder: FormBuilder,
    private authStore: AuthStoreService,
    private tvShowReminderService : TvShowRemindersService
  ) {}

  ngOnInit(): void {
    this.saveReminderForm = this.formBuilder.group({
      completed: [false, Validators.required],
      currentSeason: ['', Validators.required], 
      currentEpisode: ['', Validators.required],
      personalRating: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.saveReminderForm.getRawValue().currentEpisode);
    console.log(this.saveReminderForm.getRawValue().currentSeason);
    let user : User = {idUser: this.authStore.getUserIdFromLocalStorage(), name: null, lastName: null, username: null, password: null, email: null, role: null};
    let basicTvShowInfo : BasicTvShowInfo = { id: this.idTvShow, originalName: null}

    let reminder: TvShowReminderEntity = {
      user: user,
      basicTvShowInfo: basicTvShowInfo,
      userTvShow: null, // we always set it to null because we are creating a tv show reminder from a tv show from the search bar!
      completed: this.saveReminderForm.value.completed,
      currentSeason: this.saveReminderForm.getRawValue().currentSeason,     
      currentEpisode: this.saveReminderForm.getRawValue().currentEpisode,  
      personalRating: this.saveReminderForm.value.personalRating,
    };
    console.log(reminder);
    this.saveTvShowReminder(reminder);
  }

  saveTvShowReminder(reminder: TvShowReminderEntity) {
    this.tvShowReminderService.saveTvShowReminder(reminder).subscribe(() => this.dialogRef.close());
  }

  showOptions(event:MatCheckboxChange): void {
    console.log(event.checked);
    if(event.checked){
      this.currentSeason.setValue(null);
      this.currentEpisode.setValue(null);
      this.currentSeason.disable();
      this.currentEpisode.disable();
    }else{
      this.currentSeason.enable();
      this.currentEpisode.enable();
    }
}

  // Getters
  get completed () { return this.saveReminderForm.get('completed'); }
  get currentSeason () { return this.saveReminderForm.get('currentSeason'); }
  get currentEpisode () { return this.saveReminderForm.get('currentEpisode'); }
  get personalRating () { return this.saveReminderForm.get('personalRating'); }
}
