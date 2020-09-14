import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, empty, throwError, combineLatest, BehaviorSubject } from 'rxjs';
import { catchError, map, reduce, expand, shareReplay, switchMap, tap, take } from 'rxjs/operators';

import { Person } from './person';
import { Response, Paging } from '../shared/models';
import { PlanetService } from '../planets/planet.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private peoplePagingSubject = new BehaviorSubject<{ page: number, size: number }>({ page: 1, size: 5 });
  private peopleFilteredSubject = new BehaviorSubject<string>('');

  peopleFilteredAction$ = this.peopleFilteredSubject.asObservable();
  peoplePagingAction$ = this.peoplePagingSubject.asObservable();

  people$ = combineLatest([this.planetService.planets$, this.peopleFilteredAction$, this.peoplePagingAction$]).pipe(
    switchMap(([planets, filter, paging]) => {
      console.log('paging', paging);
      return this.getPeople(filter).pipe(
        map(people => {
          return people.map(person => ({
            ...person,
            homeworld_name: planets
              .find(p => p.url === person.homeworld)
              .name
          }) as Person);
        }),
        map((response: Person[]) => response.slice((paging.page - 1) * paging.size, paging.page * paging.size))
      );
    }),
    catchError(this.handleError)
  );

  getPeople(filter: string): Observable<Person[]> {
    return this.getPage(this.getUrlWithSearch(filter)).pipe(
      expand(data => {
        return data.next ? this.getPage(data.next) : empty();
      }),
      reduce((acc, data) => {
        return acc.concat(data.results);
      }, [])
    );
  }


  constructor(private http: HttpClient, private planetService: PlanetService) {
  }

  peoplefiltered(search: string): void {
    this.peopleFilteredSubject.next(search);
  }

  peoplePaging(page: number = 1, size: number = 5): void {
    console.log('personService.paging', page, size);
    this.peoplePagingSubject.next({ page, size });
  }

  private getUrlWithSearch(filter: string): string {
    return !!filter
      ? `http://swapi.dev/api/people/?format=json&search=${filter}`
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
