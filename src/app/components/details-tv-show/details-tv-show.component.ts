import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TvShowDetailsService } from 'src/app/services/tv-show-details.service';

@Component({
  selector: 'app-details-tv-show',
  templateUrl: './details-tv-show.component.html',
  styleUrls: ['./details-tv-show.component.css']
})
export class DetailsTvShowComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public idTvShow : number,
              private tvShowDeatils: TvShowDetailsService) { }

  ngOnInit(): void {
    this.tvShowDeatils.getTvShowDetailsById(this.idTvShow).subscribe((tvShow) => console.log(tvShow));
  }
}
