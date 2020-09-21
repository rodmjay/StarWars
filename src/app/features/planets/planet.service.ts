import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, combineLatest } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Planet, Wrapper } from '../../shared/models';
import { CachingService } from 'src/app/shared/caching/caching.service';
import { FavoriteService } from '../../favorites/favorite.service';
import { BaseService } from '../../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class PlanetService extends BaseService<Planet> {

  planets$ = combineLatest([this.listActions$, this.favoriteService.favoritePlanets$])
    .pipe(
      switchMap(([actions, favorites]) => {
        return this.getItems(actions.filter).pipe(
          map(people => {
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


}
