import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, empty, throwError, combineLatest } from 'rxjs';
import { catchError, map, reduce, expand } from 'rxjs/operators';

import { Person, Response } from './person';
import { PlanetService } from '../planets/planet.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient, private planetService: PlanetService) {

  }

  getPeopleWithHomeworld(search: string = null): Observable<Person[]> {
    return combineLatest([this.getPeople(search), this.planetService.getPlanets()]).pipe(
      map(([people, planets]) => {
        return people.map(person => ({
          ...person,
          homeworld_name: planets
            .find(p => p.url === person.homeworld)
              .name
        }) as Person);
      })
    );
  }

  private getUrlWithSearch(search: string): string {
    return !!search
      ? `https://swapi.dev/api/people/?format=json&search=${search}`
      : 'https://swapi.dev/api/people/?format=json';
  }

  private getPage(url: string): Observable<{ next: string, results: Person[] }> {
    return this.http.get<Response<Person[]>>(url).pipe(
      map(response => {
        return {
          next: response.next,
          results: response.results as Person[]
        };
      })
    );
  }

  getPeople(search: string = null): Observable<Person[]> {
    return Observable.create(observer => {
      this.getPage(this.getUrlWithSearch(search)).pipe(
        expand(data => {
          return data.next ? this.getPage(data.next) : empty();
        }),
        reduce((acc, data) => {
          return acc.concat(data.results);
        }, []),
        catchError(this.handleError)
      ).subscribe((people) => {
        observer.next(people);
        observer.complete();
      });
    });
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
