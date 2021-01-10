import { Injectable } from '@angular/core';

// Communicating with backend services using HTTP angular client
import { HttpClient, HttpHeaders} from '@angular/common/http';

// Importing operators from rxjs library 
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// Importing intefaces:
import { TvShowDetails } from '../interfaces/TvShowDetails';

@Injectable({
  providedIn: 'root'
})
export class TvShowDetailsService {

  tvShowsDetailsUrl = 'http://localhost:8080/tvShowDetails/1399';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /* GET tv shows details from the server */
  getTvShowDetailsById(): Observable<TvShowDetails> {
    return this.http.get<TvShowDetails>(this.tvShowsDetailsUrl).pipe(
      tap((result) => console.log(result)) 
    );
  }

  constructor(private http: HttpClient) { }
}
