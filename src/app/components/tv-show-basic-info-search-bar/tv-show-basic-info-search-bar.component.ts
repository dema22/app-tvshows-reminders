import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { BasicTvShowInfo } from 'src/app/interfaces/BasicTvShowInfo';
import { AuthStoreService } from 'src/app/services/auth-store.service';
import { TvShowBasicInfoSearchBarService } from 'src/app/services/tv-show-basic-info-search-bar.service';
import { TvShowDetailsComponent } from '../tv-show-details/tv-show-details.component';

@Component({
  selector: 'app-tv-show-basic-info-search-bar',
  templateUrl: './tv-show-basic-info-search-bar.component.html',
  styleUrls: ['./tv-show-basic-info-search-bar.component.css'],
})
export class TvShowBasicInfoSearchBarComponent implements OnInit {

  searchForm : FormGroup;
  basicTvShowsInformation$ : Observable<BasicTvShowInfo[]>;
  
  constructor(private fb: FormBuilder,
             private tvShowBasicInfoService : TvShowBasicInfoSearchBarService,
             private dialog: MatDialog,
             private authStore: AuthStoreService ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchBar : ''
    });
    this.onChanges();
    this.authStore.isLoggedIn();
  }

  onChanges(){
    this.basicTvShowsInformation$ = this.searchForm.get('searchBar').valueChanges.pipe(
        filter((value) => typeof value === 'string'), //isString
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),
        // ignore new term if same as previous term
        distinctUntilChanged(),
        switchMap(value => this.tvShowBasicInfoService.getBasicTvShowInfoByName(value))
      );
  }

  displayFn(tvShow: BasicTvShowInfo): string {
    return tvShow ? tvShow.original_name : '';
  }

  openTvShowDialog(idTvShow: number): void {
    //console.log("ENTRA A ABRIR DIALOGO");

    this.searchForm.get('searchBar').setValue('');

    let dialogRef = this.dialog.open(TvShowDetailsComponent,{
      height: '800px',
      width: '800px',
      data: idTvShow
    });
  }
}