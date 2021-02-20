import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TvShowDetails } from '../interfaces/TvShowDetails';
import { baseUrl, tvShowDetailEndpoints, tvShowEndpoints } from '../constants/endpoints';


@Injectable({
  providedIn: 'root'
})
// Done.
export class TvShowDetailsService {

  /* GET tv shows details from the server */
  getTvShowDetailsById(idTvShow: number): Observable<TvShowDetails> {
    return this.http.get<TvShowDetails>(baseUrl+ `${tvShowDetailEndpoints.DETAILS_TV_SHOW}${idTvShow}`);/*.pipe(
      tap((result) => console.log(result)) 
    );*/
  }

  constructor(private http: HttpClient) { }
}
