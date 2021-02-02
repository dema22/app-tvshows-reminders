import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { PageResponseReminder } from 'src/app/interfaces/PageResponseReminder';
import { CommunicationService } from 'src/app/services/communication.service';
import { DataSourceTvShowRemindersService } from 'src/app/services/data-source-tv-show-reminders.service';
import { TvShowRemindersService } from 'src/app/services/tv-show-reminders.service';

@Component({
  selector: 'app-tv-show-reminders',
  templateUrl: './tv-show-reminders.component.html',
  styleUrls: ['./tv-show-reminders.component.css'],
})
export class TvShowRemindersComponent implements OnInit , AfterViewInit {
  totalElementsForPagination : number;
  reminder = {} as PageResponseReminder;
  dataSource: DataSourceTvShowRemindersService;
  displayedColumns = [
    'name',
    'genre',
    'currentSeason',
    'currentEpisode',
    'completed',
    'personalRating',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tvShowRemindersService: TvShowRemindersService,  private communicationService: CommunicationService) {}

  ngOnInit(): void {
    this.dataSource = new DataSourceTvShowRemindersService(this.tvShowRemindersService);
    this.dataSource.loadReminders(0, 3);

    // Get the total number of element to paginated
    this.dataSource.totalElementsForPagination$.subscribe((totalElementsToPaginated) => {
      console.log("ngOnInit: Entra calcular la cantida de retorno de paginacion: ");
      this.totalElementsForPagination = totalElementsToPaginated;
      console.log(this.totalElementsForPagination);
    });

    // If we add a tv show reminder dialog from the modal, we are going to reload the reminders page to get the latest reminders of the user.
    this.communicationService.changeEmitted$.subscribe(() => {
      //console.log("I add a reminder from the TvShowReminderDialog")
      //console.log(data);
      // Reload the page
      //this.dataSource.loadReminders(0, 3);
      this.loadRemindersPage();
    });
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadRemindersPage())).subscribe();

    // Get the total number of element to paginated
    this.dataSource.totalElementsForPagination$.subscribe((totalElementsToPaginated) => {
      console.log("ngAfterViewInit : Entra calcular la cantida de retorno de paginacion: ");
      this.totalElementsForPagination = totalElementsToPaginated;
      console.log(this.totalElementsForPagination);
    });
  }

  loadRemindersPage() {
    this.dataSource.loadReminders(
      this.paginator.pageIndex, // number of page
      this.paginator.pageSize // size of the page (elements)
    );
  }

  /*
  (page)="onPaginateChange($event)"
  onPaginateChange(event? : PageEvent){
    console.log(event);
  }*/
}
