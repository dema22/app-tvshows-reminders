import { Component, Inject, OnInit } from '@angular/core';

import { TvShowDetailsService } from '../../services/tv-show-details.service';
import { TvShowDetails } from '../../interfaces/TvShowDetails';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css']
})
export class TvShowDetailsComponent implements OnInit {

  safeUrlVideos : SafeResourceUrl[] = [];
  isLoading : boolean;
  tvShowDetails = {} as TvShowDetails;
  constructor(@Inject(MAT_DIALOG_DATA) public idTvShow : number,
              private tvShowDetailsService: TvShowDetailsService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getTvShowDetails(this.idTvShow);
  }

  // We get the tv show details from our service, sanitized the trailers url, and then set the loading flag to false.
  getTvShowDetails(idTvShow: number): void {
    this.tvShowDetailsService.getTvShowDetailsById(idTvShow).subscribe((tvShowsResult) => {
    this.tvShowDetails = tvShowsResult;
    this.sanitizeVideosUrl();
    this.isLoading = false;
    });
  }

  // We iterate the url from the details object, and populate each new secured url into the safeUrlVideos array.
  sanitizeVideosUrl() : void {
    if(this.tvShowDetails.trailersURL.length > 0){
      this.tvShowDetails.trailersURL.forEach((videos) => this.safeUrlVideos.push(this.sanitizer.bypassSecurityTrustResourceUrl(videos)));
    }
  }
}
