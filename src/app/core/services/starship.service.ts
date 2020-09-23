import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CachingService } from 'src/app/shared/caching/caching.service';
import { BaseService } from '../../shared/base.service';
import { Starship } from '../../shared/models';
import { FavoriteService } from 'src/app/core/services/favorite.service';

@Injectable()
export class StarshipService extends BaseService<Starship> {

  starships$ = combineLatest([this.listActions$, this.favoriteService.favoriteStarships$])
    .pipe(
      switchMap(([actions, favorites]) => {
        return this.getItems(actions.filter).pipe(
          map(starships => {
            const starshipList = starships.map(starship => ({
              ...starship
            }) as Starship);
            return this
              .getWrapper(actions.page, actions.size, favorites.length, starshipList);
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
