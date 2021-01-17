import { Injectable } from '@angular/core';

// Communicating with backend services using HTTP angular client
import { HttpClient, HttpHeaders} from '@angular/common/http';

// Importing operators from rxjs library 
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// Importing intefaces:
import { TvShowDetails } from '../interfaces/TvShowDetails';

import { baseUrl, tvShowDetailEndpoints, tvShowEndpoints } from '../constants/endpoints';


@Injectable({
  providedIn: 'root'
})
export class TvShowDetailsService {

  /* GET tv shows details from the server */
  getTvShowDetailsById(idTvShow: number): Observable<TvShowDetails> {
    return this.http.get<TvShowDetails>(baseUrl+ `${tvShowDetailEndpoints.DETAILS_TV_SHOW}${idTvShow}`).pipe(
      tap((result) => console.log(result)) 
    );
  }

  constructor(private http: HttpClient) { }
}
