import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject, of, combineLatest, empty, EMPTY } from 'rxjs';
import { catchError, map, reduce, expand, shareReplay, switchMap } from 'rxjs/operators';

import { Planet } from './planet';
import { Response, Wrapper } from '../shared/models';
import { CachingService } from '../caching/caching.service';
import { FavoriteService } from '../favorites/favorite.service';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private listSubject = new BehaviorSubject<{ page: number, size: number, filter: string }>
    ({ page: 1, size: 5, filter: '' });
  listActions$ = this.listSubject.asObservable();


  planets$: Observable<Wrapper<Planet[]>> =
  combineLatest([this.listActions$, this.favoriteService.favoritePlanets$]).pipe(
    switchMap(([actions, favorites]) => {
      return this.getPlanets(actions.filter).pipe(
        map(people => {

          // custom mapping logic
          const personList = people.map(planet => ({
            ...planet,
            isFavorite: favorites.findIndex(x => x.url === planet.url) > -1
          }) as Planet);

          const wrapper: Wrapper<Planet[]> = {
            page: actions.page,
            size: actions.size,
            pages: Math.floor((personList.length + actions.size - 1) / actions.size),
            results: personList.slice((actions.page - 1) * actions.size, actions.page * actions.size),
            totalFavorites: favorites.length
          };

          return wrapper;
        })
      );
    }),
    catchError(this.handleError)
  );

  allPlanets$: Observable<Planet[]> = this.getPage('http://swapi.dev/api/planets/?format=json')
    .pipe(
      expand(data => {
        return data.next ? this.getPage(data.next) : empty();
      }),
      reduce((acc, data) => {
        return acc.concat(data.results);
      }, []),
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

  constructor(private http: HttpClient, private caching: CachingService, private favoriteService: FavoriteService) {

  }

  private getUrlWithSearch(filter: string): string {
    return !!filter
      ? `http://swapi.dev/api/planets/?format=json&search=${filter}`
      : 'http://swapi.dev/api/planets/?format=json';
  }

  private getPlanets(filter: string): Observable<Planet[]> {

    let retVal: Planet[];

    if (filter === '' && this.caching.getItem<Planet[]>('planets')) {
      retVal = this.caching.getItem<Planet[]>('planets');
      return of(retVal);
    }

    return this.getPage(this.getUrlWithSearch(filter)).pipe(
      expand(data => {
        return data.next ? this.getPage(data.next) : EMPTY;
      }),
      reduce((acc, data) => {

        retVal = acc.concat(data.results);

        if (filter === '') {
          this.caching.setItem<Planet[]>('planets', retVal);
        }

        return retVal;
      }, [])
    );
  }

  refresh(page: number = 1, size: number = 5, filter: string = ''): void {
    this.listSubject.next({ page, size, filter });
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
