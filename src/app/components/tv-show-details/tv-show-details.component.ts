import { Component, Inject, OnInit } from '@angular/core';

import { TvShowDetailsService } from '../../services/tv-show-details.service';
import { TvShowDetails } from '../../interfaces/TvShowDetails';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { AuthStoreService } from 'src/app/services/auth-store.service';
import { TvShowReminderDialogComponent } from '../tv-show-reminder-dialog/tv-show-reminder-dialog.component';
import { TvShowReminder } from 'src/app/interfaces/TvShowReminder';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css']
})
// Done.
export class TvShowDetailsComponent implements OnInit {
  
  isLoggedIn : boolean;
  safeUrlVideos : SafeResourceUrl[] = [];
  isLoading : boolean;
  tvShowDetails = {} as TvShowDetails;

  constructor(private dialogRef: MatDialogRef<TvShowDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data : {idTvShow : number, reminder: TvShowReminder, saveReminder: boolean},
              private tvShowDetailsService: TvShowDetailsService,
              private sanitizer: DomSanitizer,
              private authStore: AuthStoreService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true;

    if(this.data.idTvShow)
      this.getTvShowDetails(this.data.idTvShow);
    else
      this.geDetailsFromReminder(this.data.reminder);

    this.checkIfIsLoggedIn();
  }

  // We check if its logged in so we can show the add reminder button in the HTML. We also check for the data object the saveReminder flag.
  checkIfIsLoggedIn() {
    this.authStore.isLoggedIn$.subscribe((value) => this.isLoggedIn = value);
  }

  // We get the tv show details from our service, sanitized the trailers url, and then set the loading flag to false.
  getTvShowDetails(idTvShow: number): void {
    this.tvShowDetailsService.getTvShowDetailsById(idTvShow).subscribe((tvShowsResult) => {
      this.tvShowDetails = tvShowsResult;
      this.sanitizeVideosUrl();
      this.isLoading = false;
    });
  }

  geDetailsFromReminder(reminder: TvShowReminder): void {
    console.log("Load reminder deatails from the table row");
    this.tvShowDetails = reminder.tvShowDetailsResponseDTO;
    this.sanitizeVideosUrl();
    this.isLoading = false;
  }

  // We iterate the url from the details object, and populate each new secured url into the safeUrlVideos array.
  sanitizeVideosUrl() : void {
    if(this.tvShowDetails.trailersURL.length > 0){
      this.tvShowDetails.trailersURL.forEach((videos) => this.safeUrlVideos.push(this.sanitizer.bypassSecurityTrustResourceUrl(videos)));
    }
  }

  // Open the reminders dialog, we pass the id of the tv show.
  openRemindersDialog(): void {
    let dialogRef = this.dialog.open(TvShowReminderDialogComponent,{
      height: '500px',
      width: '500px',
      data: {
        reminder: null,
        idTvShow: this.data.idTvShow,
        userTvShow: null
      }
    });
  }

  // Close the current dialog when the button is click
  closeDialogFromButton() {
    this.dialogRef.close();
  }
}
