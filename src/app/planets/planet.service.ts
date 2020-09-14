import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, empty, throwError } from 'rxjs';
import { catchError, map, reduce, expand, shareReplay } from 'rxjs/operators';

import { Planet } from './planet';
import { Response } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  planets$: Observable<Planet[]> = this.getPage('http://swapi.dev/api/planets/?format=json')
    .pipe(
      expand(data => {
        return data.next ? this.getPage(data.next) : empty();
      }),
      reduce((acc, data) => {
        return acc.concat(data.results);
      }, []),
      // shareReplay({ bufferSize: 1, refCount: true }),
      catchError(this.handleError)
    );

  private getPage(url: string): Observable<{ next: string, results: Planet[] }> {
    return this.http.get<Response<Planet[]>>(url).pipe(
      map(response => {
        return {
          next: response.next,
          results: response.results as Planet[]
        };
      })
    );
  }

  constructor(private http: HttpClient) {

  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
