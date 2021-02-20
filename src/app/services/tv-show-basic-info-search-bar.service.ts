import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { baseUrl, tvShowEndpoints } from '../constants/endpoints';
import { BasicTvShowInfo } from '../interfaces/BasicTvShowInfo';

@Injectable({
  providedIn: 'root'
})
// Done.
export class TvShowBasicInfoSearchBarService {

  // Get basic tv show(s) information based on the name that the user wants to query.
  getBasicTvShowInfoByName(tvShowName: string): Observable<BasicTvShowInfo[]> {
    // if not search term, return empty observable array.
    if(!tvShowName.trim()){
      return of([]);
    };

    //console.log(tvShowName);
    const config = {
      params: {
          originalNameTvShow: tvShowName
      }
    }
    return this.http.get<BasicTvShowInfo[]>(baseUrl+ `${tvShowEndpoints.BASIC_INFO_TVSHOWS_BY_NAME}`, config);/*.pipe(
      tap((resultTvShowInfo) => console.log(resultTvShowInfo))
    )*/
  }
  
  constructor(private http: HttpClient) { }
}
