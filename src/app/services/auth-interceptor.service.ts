import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as endpoints from '../constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  // We are going to intercept every request, and if there is a token in local storage, we are going
  // to use it and created a Authorization header with the Bearer token.
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    const token = localStorage.getItem('token');
    //console.log("Token en interceptor es " + token);
    //console.log(req.url);
    //console.log(endpoints.baseUrl+ `${endpoints.tvShowDetailEndpoints.DETAILS_TV_SHOW}${1399}`);

    // Public endpoints we dont need to set auth header.
    if(req.url == (endpoints.baseUrl+ `/${endpoints.userEndpoints.LOGIN}`) ||
      req.url == (endpoints.baseUrl+ `/${endpoints.userEndpoints.ADD_USER}`) ||
      req.url == (endpoints.baseUrl+ `${endpoints.tvShowEndpoints.BASIC_INFO_TVSHOWS_BY_NAME}`)||
      req.url == (endpoints.baseUrl+ `${endpoints.tvShowDetailEndpoints.DETAILS_TV_SHOW}${1399}`)) {
      console.log("Url publicas");
      return next.handle(req);
    }

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      console.log("Mando request con beaarer token");
      return next.handle(cloned);
    }
  }
}
