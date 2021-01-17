import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BasicTvShowInfo } from '../interfaces/BasicTvShowInfo';
import { TvShowBasicInfoSearchBarService } from './tv-show-basic-info-search-bar.service';

@Injectable({
  providedIn: 'root'
})
export class TvShowBasicInfoStoreService {

  //private searchTerms = new Subject<string>();
  //public readonly basicTvShowInformation$: Observable<BasicTvShowInfo[]>;

  constructor(private  tvShowBasicInfoStore : TvShowBasicInfoSearchBarService) { }

  // Push a search term into the observable stream.
  /*search(term: string): void{
    this.searchTerms.next(term);
  }*/

  /*public getBasicTvShowInfoByName(tvShowName: string) : Observable<BasicTvShowInfo[]> {
    const obs =  this.tvShowBasicInfoStore.getBasicTvShowInfoByName(tvShowName);
    return obs;
  }*/

  /*public getBasicTvShowInfoByNameTwo(tvShowName: string) : Observable<BasicTvShowInfo[]> {
    const obs =  this.tvShowBasicInfoStore.getBasicTvShowInfoByName(tvShowName);
    return obs;
  }*/
}
