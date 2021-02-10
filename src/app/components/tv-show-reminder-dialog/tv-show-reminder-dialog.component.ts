import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BasicTvShowInfo } from 'src/app/interfaces/BasicTvShowInfo';
import { TvShowReminder } from 'src/app/interfaces/TvShowReminder';
import { TvShowReminderEmitted } from 'src/app/interfaces/TvShowReminderEmitted';
import { TvShowReminderEntity } from 'src/app/interfaces/TvShowReminderEntity';
import { TvShowReminderPatchDTO } from 'src/app/interfaces/TvShowReminderPatchDTO';
import { User } from 'src/app/interfaces/User';
import { UserTvShow } from 'src/app/interfaces/UserTvShow';
import { UserTvShowEntity } from 'src/app/interfaces/UserTvShowEntity';
import { AuthStoreService } from 'src/app/services/auth-store.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { TvShowRemindersService } from 'src/app/services/tv-show-reminders.service';
import { UserTvShowService } from 'src/app/services/user-tv-show.service';

@Component({
  selector: 'app-tv-show-reminder-dialog',
  templateUrl: './tv-show-reminder-dialog.component.html',
  styleUrls: ['./tv-show-reminder-dialog.component.css'],
})
export class TvShowReminderDialogComponent implements OnInit {
  saveReminderForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TvShowReminderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {reminder: TvShowReminder, idTvShow: number, userTvShow:  UserTvShowEntity},
    private formBuilder: FormBuilder,
    private authStore: AuthStoreService,
    private tvShowReminderService : TvShowRemindersService,
    private userTvShowService : UserTvShowService,
    private communicationService: CommunicationService
  ) {}

  ngOnInit(): void {
    //console.log("Custom object: ")
    //console.log(this.data);

    // We are going to create a reminder
    if(this.data.idTvShow !== null || this.data.userTvShow !== null){
      //console.log("CREATING TV SHOW REMINDER");
      this.saveReminderForm = this.formBuilder.group({
        completed: [false, Validators.required],
        currentSeason: ['', Validators.required], 
        currentEpisode: ['', Validators.required],
        personalRating: ['', Validators.required],
      });
    // We are going to update a reminder
    }else{
      //console.log("UPDATE TV SHOW REMINDER");
      this.saveReminderForm = this.formBuilder.group({
        completed: [this.data.reminder.completed],
        currentSeason: [this.data.reminder.currentSeason], 
        currentEpisode: [this.data.reminder.currentEpisode],
        personalRating: [this.data.reminder.personalRating],
      });
    }
  }

  // If we have a reminder, we are using the form to update it.
  // If we are creating a new tv show reminder, we are going to create the reminder from a tv show from the system or with a tv show created by the user.
  onSubmit() {
    //console.log(this.data.reminder);
    // We are going to update the reminder
    if(this.data.reminder !== null){
      this.updateReminder();
    }else{ // We are going to save a new reminder
      if(this.data.idTvShow !== null)
        this.saveReminderWithTvShowFromSystem();
      else
        this.saveReminderWithTvShowCreatedByUser();
    }
  }

  updateReminder(){
    let updateReminder: TvShowReminderPatchDTO = {
      completed: this.saveReminderForm.value.completed,
      currentSeason: this.saveReminderForm.getRawValue().currentSeason,     
      currentEpisode: this.saveReminderForm.getRawValue().currentEpisode,  
      personalRating: this.saveReminderForm.value.personalRating
    }

    this.tvShowReminderService.updateTvShowReminder(updateReminder, this.data.reminder.idTvShowReminder).subscribe((reminder) => {
      //console.log("We update the reminder successfully.");
      
      let emmitedReminder : TvShowReminderEmitted = { 
        tvShowReminder: reminder,
        emittedOperation: 'update'
      };

      this.communicationService.emitReminder(emmitedReminder);
      this.dialogRef.close();
    });

    //console.log(updateReminder);
  }

  saveReminderWithTvShowFromSystem(){
    //console.log(this.saveReminderForm.getRawValue().currentEpisode);
    //console.log(this.saveReminderForm.getRawValue().currentSeason);
    let user : User = {idUser: this.authStore.getUserIdFromLocalStorage(), name: null, lastName: null, username: null, password: null, email: null, role: null};
    let basicTvShowInfo : BasicTvShowInfo = { id: this.data.idTvShow, original_name: null}

    let reminder: TvShowReminderEntity = {
      user: user,
      basicTvShowInfo: basicTvShowInfo,
      userTvShow: null, // we always set it to null because we are creating a tv show reminder from a tv show from the search bar!
      completed: this.saveReminderForm.value.completed,
      currentSeason: this.saveReminderForm.getRawValue().currentSeason,     
      currentEpisode: this.saveReminderForm.getRawValue().currentEpisode,  
      personalRating: this.saveReminderForm.value.personalRating
    };
    //console.log(reminder);
    this.saveTvShowReminder(reminder);
  }

  saveReminderWithTvShowCreatedByUser(){
    // first we save the tv show created by the user, we suscribe, when it completes, we save our reminder with this userTvShow.
    this.saveUserTvShow(this.data.userTvShow).subscribe((savedUserTvShow) => {
      //console.log("Once i finish saving the userTvShow, i save the reminder for this tv show");
      
      let user : User = {idUser: this.authStore.getUserIdFromLocalStorage(), name: null, lastName: null, username: null, password: null, email: null, role: null};
      
      let reminder: TvShowReminderEntity = {
        user: user,
        basicTvShowInfo: null,// we always set it to null because we are creating a tv show reminder with a tv show created by the user.
        userTvShow: savedUserTvShow, 
        completed: this.saveReminderForm.value.completed,
        currentSeason: this.saveReminderForm.getRawValue().currentSeason,     
        currentEpisode: this.saveReminderForm.getRawValue().currentEpisode,  
        personalRating: this.saveReminderForm.value.personalRating
      };

      //console.log("Showing the reminder with the user tv show");
      //console.log(reminder);
      this.saveTvShowReminder(reminder);
    });
  }

  saveUserTvShow(userTvShow: UserTvShowEntity) : Observable<UserTvShow>{
    return this.userTvShowService.saveUserTvShow(userTvShow);
  }

  saveTvShowReminder(reminder: TvShowReminderEntity) {
    this.tvShowReminderService.saveTvShowReminder(reminder).subscribe((reminder) => {
      let emmitedReminder : TvShowReminderEmitted = { 
        tvShowReminder: reminder,
        emittedOperation: 'save'
      };

      this.communicationService.emitReminder(emmitedReminder);
      this.dialogRef.close();
    });
  }

  showOptions(event:MatCheckboxChange): void {
    //console.log(event.checked);
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
