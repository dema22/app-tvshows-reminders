import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PageInfo } from 'src/app/interfaces/PageInfo';
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
  pageInfo : PageInfo  = {} as PageInfo;
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
    this.dataSource = new DataSourceTvShowRemindersService(this.tvShowRemindersService);
    this.dataSource.loadReminders(0, 3);
    this.getTotalsElementsForPagination();
    this.manageEmittedReminders();
    this.manageEmittedRemindersArray();
  }

  // Get the total number of element for the pagination.
  getTotalsElementsForPagination(){
    this.dataSource.totalElementsForPagination$.subscribe((totalElementsToPaginated) => {
      //console.log("ngOnInit: Entra calcular la cantida de retorno de paginacion: ");
      this.totalElementsForPagination = totalElementsToPaginated;
      //console.log(this.totalElementsForPagination);
    });
  }

  // We get a emmited reminder from the communication service.
  manageEmittedReminders() {
    this.communicationService.changeEmittedForReminder$.subscribe((emittedReminder) => {
      //console.log("We get the emmited reminder from the modal");
      //console.log(emittedReminder);
      this.dataSource.manageEmmitedReminder(emittedReminder,this.paginator.pageSize, this.currentPage);
    });
  }

  // We get a reminder array from the communication service.
  manageEmittedRemindersArray() {
    console.log("from manageEmittedReminders: " + this.currentPage);

    this.communicationService.changeEmittedForReminderArray$.subscribe((reminders) => {
      // When the user tries to delete the last row in the page 0, i dont know why the current page is not getting the 0 value when we initialized the attribute.
      if(this.currentPage === null) {
         this.currentPage = 0; 
      }

      this.dataSource.manageEmmitedReminderArray(reminders,this.paginator.pageSize, this.currentPage);
    });
  }

  // The link between the paginator and the Data Source is done in the ngAfterViewInit() 
  // We are using the AfterViewInit lifecycle hook because we need to make sure that the paginator component queried via @ViewChild is already available.
  // Everytime  the paginator changes the page size or page index it will trigger the page event.
  // We will call the loadReminderPage to load the information of the current page 
  // or if the user is adding a reminder or deleting a reminder ( we just set the pageInfo object to null). 

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      console.log(this.pageInfo.pageIndex);
      if(this.pageInfo.pageIndex != null && this.pageInfo.pageSize != null && this.pageInfo.length != null){
        console.log("We go to page");
        this.pageInfo.pageIndex = null;
        this.pageInfo.pageSize = null;
        this.pageInfo.length = null;
      }else{
        console.log("user touch arrow direction.");
        this.loadRemindersPage();
      }
    });
    this.goToPage();
  }

  // Load the reminder page of the current page the user is on.
  loadRemindersPage() {
    this.dataSource.loadReminders(
      this.paginator.pageIndex, // number of page
      this.paginator.pageSize // size of the page (elements)
    );
  }

  // Every time we emit a pageInformation object from the data source means that the user added a reminder or delete a reminder and we need to go to a specifc page.
  // We do this using the .next() method on the page event.
  goToPage() {
    this.dataSource.goToPage$.subscribe((pageInformation) => {
      console.log("Go to page ");
      this.pageInfo = pageInformation;
      console.log(this.pageInfo);
      
      this.paginator.pageIndex = this.pageInfo.pageIndex;
      console.log("Go to page -> page inex is  : " + this.paginator.pageIndex);

        this.paginator.page.next({      
          pageIndex: pageInformation.pageIndex,
          pageSize: pageInformation.pageSize,
          length: pageInformation.length
        });
    });
  }

  openUserTvShowDialog() {
    //console.log("Open user tv show dialog");
    let dialogRef = this.dialog.open(UserTvShowComponent,{
      height: '500px',
      width: '500px'
    });
  }
  
  openReminderDialog(reminder : TvShowReminder) {
    //console.log("Load the reminder we click");
    //console.log(reminder)
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
    //console.log(reminder)
    this.dialog.open(DeleteReminderDialogComponent,{
      height: '250px',
      width: '250px',
      data: {
        reminder: reminder,
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize
      }
    });
  }

  // Each time the user click on the paginator arrows we will trigger this function.
  // We saved the pageIndex info from the pageEvent.
  pageEvents(event: any) {
    //console.log(event.pageIndex);
    //console.log(event.pageSize);
    this.currentPage = event.pageIndex;
    //console.log(event);
 }
}
