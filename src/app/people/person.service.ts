import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, empty, throwError, combineLatest, BehaviorSubject } from 'rxjs';
import { catchError, map, reduce, expand, shareReplay, switchMap, withLatestFrom, tap } from 'rxjs/operators';

import { Person, Response } from './person';
import { PlanetService } from '../planets/planet.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private peopleFilteredSubject = new BehaviorSubject<string>('');
  peopleFilteredAction$ = this.peopleFilteredSubject.asObservable();

  people$ = combineLatest([this.planetService.planets$, this.peopleFilteredAction$]).pipe(
    // map(([planets, filter]) => console.log('mappedValues', planets, filter)),
    switchMap(([planets, filter]) => {
      return this.getPeople().pipe(
        map(people => {
          return people.map(person => ({
            ...person,
            homeworld_name: planets
              .find(p => p.url === person.homeworld)
              .name
          }) as Person);
        })
      );
    }),
    tap(x => console.log(x)),
  );

  getPeople(): Observable<Person[]> {
    return this.getPage(this.getUrlWithSearch()).pipe(
      expand(data => {
        return data.next ? this.getPage(data.next) : empty();
      }),
      reduce((acc, data) => {
        return acc.concat(data.results);
      }, []),
      catchError(this.handleError)
    );
  }


  constructor(private http: HttpClient, private planetService: PlanetService) {
  }

  peoplefiltered(search: string): void {
    this.peopleFilteredSubject.next(search);
  }

  private getUrlWithSearch(): string {
    return !!this.peopleFilteredSubject.value
      ? `http://swapi.dev/api/people/?format=json&search=${this.peopleFilteredSubject.value}`
      : 'http://swapi.dev/api/people/?format=json';
  }

  private getPage(url: string): Observable<{ next: string, results: Person[] }> {
    return this.http.get<Response<Person[]>>(url).pipe(
      map(response => {
        return {
          next: response.next,
          results: response.results as Person[]
        };
      }),
      // shareReplay({ bufferSize: 1, refCount: true })
    );
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
