import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { baseUrl, tvShowEndpoints } from '../constants/endpoints';
import { BasicTvShowInfo } from '../interfaces/BasicTvShowInfo';

@Injectable({
  providedIn: 'root'
})
export class TvShowBasicInfoSearchBarService {

  // Get basic tv show information based on the name that the user wants to query.
  getBasicTvShowInfoByName(tvShowName: string): Observable<BasicTvShowInfo[]> {
    console.log(tvShowName);
    const config = {
      params: {
          originalNameTvShow: tvShowName
      }
    }
    return this.http.get<BasicTvShowInfo[]>(baseUrl+ `${tvShowEndpoints.BASIC_INFO_TVSHOWS_BY_NAME}`, config).pipe(  //("http://localhost:8080/tvShow/?originalNameTvShow=Game");/*
      tap((resultBasicTvShowInfo) => console.log(resultBasicTvShowInfo))
    );
  }
  
  constructor(private http: HttpClient) { }
}
