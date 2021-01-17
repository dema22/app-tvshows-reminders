import { Component, Inject, OnInit } from '@angular/core';

import { TvShowDetailsService } from '../../services/tv-show-details.service';
import { TvShowDetails } from '../../interfaces/TvShowDetails';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css']
})
export class TvShowDetailsComponent implements OnInit {

  tvShowDetails = {} as TvShowDetails;
  constructor(@Inject(MAT_DIALOG_DATA) public idTvShow : number,
              private tvShowDetailsService: TvShowDetailsService) { }

  ngOnInit(): void {
    this.getTvShowDetails(this.idTvShow);
  }

  getTvShowDetails(idTvShow: number): void {
    console.log("entra");
    this.tvShowDetailsService.getTvShowDetailsById(idTvShow).subscribe((tvShowsResult) => this.tvShowDetails = tvShowsResult);
  }

}
