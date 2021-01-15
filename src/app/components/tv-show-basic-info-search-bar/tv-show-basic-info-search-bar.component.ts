import { Component, OnInit } from '@angular/core';
import { BasicTvShowInfo } from 'src/app/interfaces/BasicTvShowInfo';
import { TvShowBasicInfoSearchBarService } from 'src/app/services/tv-show-basic-info-search-bar.service';

@Component({
  selector: 'app-tv-show-basic-info-search-bar',
  templateUrl: './tv-show-basic-info-search-bar.component.html',
  styleUrls: ['./tv-show-basic-info-search-bar.component.css'],
})
export class TvShowBasicInfoSearchBarComponent implements OnInit {
  
  basicTvShowInformation : BasicTvShowInfo[];
  constructor(private tvShowBasicInfoService : TvShowBasicInfoSearchBarService) {}

  ngOnInit(): void {
    this.getTvShowBasicInfo();
  }

  getTvShowBasicInfo(): void {
    console.log("entra");
    this.tvShowBasicInfoService.getBasicTvShowInfoByName("Game of t").subscribe((result) => {
      this.basicTvShowInformation = result;
    });
  }
}
