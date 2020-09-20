import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject, of, combineLatest, empty, EMPTY } from 'rxjs';
import { catchError, map, reduce, expand, shareReplay, switchMap } from 'rxjs/operators';

import { Planet } from './planet';
import { Response, Wrapper } from '../shared/models';
import { CachingService } from '../caching/caching.service';
import { FavoriteService } from '../favorites/favorite.service';
import { BaseService } from '../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class PlanetService extends BaseService<Planet> {

  planets$: Observable<Wrapper<Planet[]>> =
    combineLatest([this.listActions$, this.favoriteService.favoritePlanets$]).pipe(
      switchMap(([actions, favorites]) => {
        return this.getItems(actions.filter).pipe(
          map(people => {

            // custom mapping logic
            const planetList = people.map(planet => ({
              ...planet,
              isFavorite: favorites.findIndex(x => x.url === planet.url) > -1
            }) as Planet);

            return this
              .getWrapper(actions.page, actions.size, favorites.length, planetList);
          })
        );
      }),
      catchError(this.handleError)
    );

  constructor(http: HttpClient, caching: CachingService, favoriteService: FavoriteService) {
    super(http, caching, favoriteService, 'planets');
  }

  refresh(page: number = 1, size: number = 5, filter: string = ''): void {
    this.listSubject.next({ page, size, filter });
  }

}
