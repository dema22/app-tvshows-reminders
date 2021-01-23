import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TvShowReminders } from 'src/app/interfaces/TvShowReminders';
import { DataSourceTvShowRemindersService } from 'src/app/services/data-source-tv-show-reminders.service';
import { TvShowRemindersService } from 'src/app/services/tv-show-reminders.service';

@Component({
  selector: 'app-tv-show-reminders',
  templateUrl: './tv-show-reminders.component.html',
  styleUrls: ['./tv-show-reminders.component.css']
})
export class TvShowRemindersComponent implements AfterViewInit {
  dataSource: any[] = []; // TvShowReminders
  displayedColumns= ["name", "genre", "currentSeason", "currentEpisode", "completed", "personalRating"];

  constructor(private tvShowRemindersService: TvShowRemindersService) {}

  ngAfterViewInit() {
      this.tvShowRemindersService.getTvShowRemindersPaginated(0,5).subscribe((result)=>{
        if(result != null){
          this.dataSource = result.items;
        }
        console.log(this.dataSource);
      });
  }
}
