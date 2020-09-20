import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CachingService } from '../caching/caching.service';
import { FavoriteService } from '../favorites/favorite.service';
import { BaseService } from '../shared/base.service';
import { Wrapper } from '../shared/models';
import { Starship } from './starship';


@Injectable({
  providedIn: 'root'
})
export class StarshipService extends BaseService<Starship> {

  starships$: Observable<Wrapper<Starship[]>> =
    combineLatest([this.listActions$, this.favoriteService.favoriteStarships$]).pipe(
      switchMap(([actions, favorites]) => {
        return this.getItems(actions.filter).pipe(
          map(starships => {

            // custom mapping logic
            const starshipList = starships.map(starship => ({
              ...starship
            }) as Starship);

            return this.getWrapper(actions.page, actions.size, favorites.length, starshipList);
          })
        );
      }),
      catchError(this.handleError)
    );

  constructor(
    http: HttpClient,
    favoriteService: FavoriteService,
    caching: CachingService) {
    super(http, caching, favoriteService, 'starships');
  }
}
