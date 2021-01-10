import { Component, OnInit } from '@angular/core';

import { TvShowDetailsService } from '../../services/tv-show-details.service';
import { TvShowDetails } from '../../interfaces/TvShowDetails';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css']
})
export class TvShowDetailsComponent implements OnInit {

  tvShowDetails = {} as TvShowDetails;
  constructor(private tvShowDetailsService: TvShowDetailsService) { }

  ngOnInit(): void {
    this.getTvShowDetails();
  }

  getTvShowDetails(): void {
    console.log("entra");
    this.tvShowDetailsService.getTvShowDetailsById().subscribe((tvShowsResult) => this.tvShowDetails = tvShowsResult);
  }

}
