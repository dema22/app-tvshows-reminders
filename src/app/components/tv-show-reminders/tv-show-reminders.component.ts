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
    'posterImg',
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
    this.getTotalsElementsForPagination();
    this.pushRemindersToDataSource();
  }

  // Get the total number of element to paginated
  getTotalsElementsForPagination(){
    this.dataSource.totalElementsForPagination$.subscribe((totalElementsToPaginated) => {
      console.log("ngOnInit: Entra calcular la cantida de retorno de paginacion: ");
      this.totalElementsForPagination = totalElementsToPaginated;
      console.log(this.totalElementsForPagination);
    });
  }

  // If we add a tv show reminder dialog from the modal, we are going to reload the reminders page to get the latest reminders of the user.
  pushRemindersToDataSource() {
  this.communicationService.changeEmitted$.subscribe((reminderDTO) => {
    console.log("We get the remindersDTO from the modal");
    console.log(reminderDTO);
    this.dataSource.saveReminderInDataSource(reminderDTO,this.paginator.pageSize);
  });
  }

  // The link between the paginator and the Data Source is done in the ngAfterViewInit() 
  // We are using the AfterViewInit lifecycle hook because we need to make sure that the paginator component queried via @ViewChild is already available.
  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadRemindersPage())).subscribe();
  }

  loadRemindersPage() {
    this.dataSource.loadReminders(
      this.paginator.pageIndex, // number of page
      this.paginator.pageSize // size of the page (elements)
    );
  }
}
