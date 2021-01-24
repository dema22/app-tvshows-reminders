import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthStoreService } from 'src/app/services/auth-store.service';

@Component({
  selector: 'app-tv-show-reminder-dialog',
  templateUrl: './tv-show-reminder-dialog.component.html',
  styleUrls: ['./tv-show-reminder-dialog.component.css'],
})
export class TvShowReminderDialogComponent implements OnInit {
  saveReminderForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public idTvShow: number,
    private formBuilder: FormBuilder,
    private authStore: AuthStoreService
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

    let reminder: any = {
      user: {
        idUser: this.authStore.getUserIdFromLocalStorage(),
      },
      basicTvShowInfo: {
        id: this.idTvShow,
      },
      userTvShow: null, // we always set it to null because we are creating a tv show reminder from a tv show from the API.
      completed: this.saveReminderForm.value.completed,
      currentSeason: this.saveReminderForm.getRawValue().currentSeason,     //this.saveReminderForm.value.currentSeason,
      currentEpisode: this.saveReminderForm.getRawValue().currentEpisode,  //this.saveReminderForm.value.currentEpisode,
      personalRating: this.saveReminderForm.value.personalRating,
    };
    console.log(reminder);
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
