import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { combineLatest, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Planet } from '../models';
import { CachingService } from 'src/app/core/services/caching.service';
import { BaseService } from '../bases/base.service';
import { FavoriteService } from './favorite.service';
import { environment as env } from 'src/environments/environment';

@Injectable()
export class PlanetService extends BaseService<Planet> {

  private planetUrl = `${env.apiUrl}/api/people`;

  planets$ = combineLatest([this.listActions$, this.favoriteService.favoritePlanets$])
    .pipe(
      switchMap(([actions, favorites]) => {
        return this.getItems(actions.filter).pipe(
          map(people => {
            const planetList = people.map(planet => ({
              ...planet,
              id: +planet.url.split('/')[5],
              isFavorite: favorites.findIndex(x => x.url === planet.url) > -1
            }) as Planet);

            console.log('planets', planetList);

            return this
              .getWrapper(actions.page, actions.size, favorites.length, planetList);
          })
        );
      }),
      catchError(this.handleError)
    );

    getPlanet(id: number): Observable<Planet> {
      const url = `${this.planetUrl}/${id}`;
      return this.http.get<Planet>(url)
        .pipe(
          map(planet => ({
            ...planet,
            id: +planet.url.split('/')[5],
          })),
          catchError(this.handleError)
        );
    }


  constructor(http: HttpClient, caching: CachingService, favoriteService: FavoriteService) {
    super(http, caching, favoriteService, 'planets');
  }


}
