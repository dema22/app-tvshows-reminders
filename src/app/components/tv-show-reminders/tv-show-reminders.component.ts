import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { PageResponseReminder } from 'src/app/interfaces/PageResponseReminder';
import { TvShowReminder } from 'src/app/interfaces/TvShowReminder';
import { CommunicationService } from 'src/app/services/communication.service';
import { DataSourceTvShowRemindersService } from 'src/app/services/data-source-tv-show-reminders.service';
import { TvShowRemindersService } from 'src/app/services/tv-show-reminders.service';
import { DeleteReminderDialogComponent } from '../delete-reminder-dialog/delete-reminder-dialog.component';
import { TvShowReminderDialogComponent } from '../tv-show-reminder-dialog/tv-show-reminder-dialog.component';
import { UserTvShowComponent } from '../user-tv-show/user-tv-show.component';

@Component({
  selector: 'app-tv-show-reminders',
  templateUrl: './tv-show-reminders.component.html',
  styleUrls: ['./tv-show-reminders.component.css'],
})
export class TvShowRemindersComponent implements OnInit , AfterViewInit {
  totalElementsForPagination : number;
  currentPage : number = 0;
  dataSource: DataSourceTvShowRemindersService;
  displayedColumns = [
    'posterImg',
    'name',
    'genre',
    'currentSeason',
    'currentEpisode',
    'completed',
    'personalRating',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tvShowRemindersService: TvShowRemindersService,
              private communicationService: CommunicationService,
              private dialog: MatDialog,) {}

  ngOnInit(): void {
    console.log("NG ON INIT DE LA TABLA");
    this.dataSource = new DataSourceTvShowRemindersService(this.tvShowRemindersService);
    this.dataSource.loadReminders(0, 3);
    this.getTotalsElementsForPagination();
    this.manageEmittedReminders();
    //this.pushRemindersToDataSource();
    //this.updateReminderToDataSource();
    // this.deleteReminderFromDataSource();
  }

  changePage(){
    this.dataSource.goToPreviousPage$.subscribe((condition) => {
      console.log("MORTA CHUPA VERGA");
      console.log(condition);
      this.paginator.previousPage();
    });
  }

  // Get the total number of element to paginated
  getTotalsElementsForPagination(){
    this.dataSource.totalElementsForPagination$.subscribe((totalElementsToPaginated) => {
      console.log("ngOnInit: Entra calcular la cantida de retorno de paginacion: ");
      this.totalElementsForPagination = totalElementsToPaginated;
      console.log(this.totalElementsForPagination);
    });
  }

  manageEmittedReminders() {
    this.communicationService.changeEmittedForReminder$.subscribe((emittedReminder) => {
      console.log("We get the emmited reminder from the modal");
      console.log(emittedReminder);
      this.dataSource.manageEmmitedReminder(emittedReminder,this.paginator.pageSize, this.currentPage);
    });
  }


  /*
  // If we add a tv show reminder dialog from the modal, we are going to reload the reminders data source with this new reminder.
  pushRemindersToDataSource() {
    this.communicationService.changeEmittedForSavingReminder$.subscribe((reminderDTO) => {
      console.log("We get the remindersDTO from the modal");
      console.log(reminderDTO);
      this.dataSource.saveReminderInDataSource(reminderDTO,this.paginator.pageSize);
    });
  }

  // If we update a tv show reminder, we are going to load this new reminders in the data source.
  updateReminderToDataSource() {
    this.communicationService.changeEmittedForUpdatingReminder$.subscribe((reminderDTO) => {
      console.log("We get the remindersDTO from the modal");
      console.log(reminderDTO);
      this.dataSource.updateReminderInDataSource(reminderDTO,this.paginator.pageSize);
    });
  }

  deleteReminderFromDataSource() {
    this.communicationService.changeEmittedForDeletingReminder$.subscribe((reminderDTO) => {
      console.log(reminderDTO);
      this.dataSource.deleteReminderFromDataSource(reminderDTO,this.paginator.pageSize, this.currentPage);
    });
  }
  */

  // The link between the paginator and the Data Source is done in the ngAfterViewInit() 
  // We are using the AfterViewInit lifecycle hook because we need to make sure that the paginator component queried via @ViewChild is already available.
  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadRemindersPage())).subscribe();
    this.changePage();
  }

  loadRemindersPage() {
    this.dataSource.loadReminders(
      this.paginator.pageIndex, // number of page
      this.paginator.pageSize // size of the page (elements)
    );
  }

  openUserTvShowDialog() {
    console.log("Open user tv show dialog");
    let dialogRef = this.dialog.open(UserTvShowComponent,{
      height: '500px',
      width: '500px'
    });
  }
  
  openReminderDialog(reminder : TvShowReminder) {
    console.log("Load the reminder we click");
    console.log(reminder)
    this.dialog.open(TvShowReminderDialogComponent,{
      height: '500px',
      width: '500px',
      data: {
        reminder: reminder,
        idTvShow: null,
        userTvShow: null
      }
    });
  }

  deleteReminderDialog(reminder : TvShowReminder) {
    console.log(reminder)
    this.dialog.open(DeleteReminderDialogComponent,{
      height: '250px',
      width: '250px',
      data: {
        reminder: reminder,
        idTvShow: null,
        userTvShow: null,
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize
      }
    });
  }

  pageEvents(event: any) {
    console.log(event.pageIndex);
    console.log(event.pageSize);
    this.currentPage = event.pageIndex;
    console.log(event);
 }
}
