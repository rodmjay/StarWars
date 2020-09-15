import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, empty, throwError, combineLatest, BehaviorSubject, of } from 'rxjs';
import { catchError, map, reduce, expand, shareReplay, switchMap, tap, take } from 'rxjs/operators';

import { Person } from './person';
import { Response, Paging, Wrapper } from '../shared/models';
import { PlanetService } from '../planets/planet.service';
import { CachingService } from '../caching/caching.service';
import { FavoriteService } from '../favorites/favorite.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private listSubject = new BehaviorSubject<{ page: number, size: number, filter: string }>
    ({ page: 1, size: 5, filter: '' });

  listActions$ = this.listSubject.asObservable();

  people$: Observable<Wrapper<Person[]>> =
    combineLatest([this.planetService.planets$, this.listActions$, this.favoriteService.favorites$]).pipe(
      switchMap(([planets, actions, favorites]) => {

        console.log('favorites', favorites);

        return this.getPeople(actions.filter).pipe(
          map(people => {

            // custom mapping logic
            const personList = people.map(person => ({
              ...person,
              isFavorite: favorites.findIndex(x => x.url === person.url) > -1,
              homeworld_name: planets
                .find(p => p.url === person.homeworld)
                .name
            }) as Person);
            return personList;
          }),
          map((response: Person[]) => {

            console.log('actions', actions);

            // custom paging logic
            const wrapper: Wrapper<Person[]> = {
              page: actions.page,
              size: actions.size,
              pages: Math.floor((response.length + actions.size - 1) / actions.size),
              results: response.slice((actions.page - 1) * actions.size, actions.page * actions.size),
              totalFavorites: favorites.length
            };

            return wrapper;
          })
        );
      }),
      catchError(this.handleError)
    );

  getPeople(filter: string): Observable<Person[]> {

    let retVal: Person[];


    if (filter === '' && this.caching.getItem<Person[]>('people')) {
      retVal = this.caching.getItem<Person[]>('people');
      return of(retVal);
    }

    return this.getPage(this.getUrlWithSearch(filter)).pipe(
      expand(data => {
        return data.next ? this.getPage(data.next) : empty();
      }),
      reduce((acc, data) => {

        retVal = acc.concat(data.results);

        if (filter === '') {
          this.caching.setItem<Person[]>('people', retVal);
        }

        return retVal;
      }, [])
    );
  }


  constructor(
    private http: HttpClient,
    private planetService: PlanetService,
    private favoriteService: FavoriteService,
    private caching: CachingService) {

  }

  refresh(page: number = 1, size: number = 5, filter: string = ''): void {
    this.listSubject.next({ page, size, filter });
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
