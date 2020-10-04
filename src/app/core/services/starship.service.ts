import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { CachingService } from "src/app/core/services/caching.service";
import { BaseService } from "../bases/base.service";
import { Starship } from "../models";
import { FavoriteService } from "src/app/core/services/favorite.service";
import { environment as env } from "src/environments/environment";

@Injectable()
export class StarshipService extends BaseService<Starship> {
  private starshipUrl = `${env.apiUrl}/api/starships`;

  starships$ = combineLatest([
    this.listActions$,
    this.favoriteService.favoriteStarships$,
  ]).pipe(
    switchMap(([actions, favorites]) => {
      return this.getItems(actions.filter).pipe(
        map((starships) => {
          const starshipList = starships.map(
            (starship) =>
              ({
                ...starship,
                id: +starship.url.split("/")[5],
              } as Starship)
          );
          return this.getWrapper(
            actions.page,
            actions.size,
            favorites.length,
            starshipList
          );
        })
      );
    }),
    catchError(this.handleError)
  );

  getStarship(id: number): Observable<Starship> {
    const url = `${this.starshipUrl}/${id}`;
    return this.http.get<Starship>(url).pipe(
      map((starship) => ({
        ...starship,
        id: +starship.url.split("/")[5],
      })),
      catchError(this.handleError)
    );
  }

  constructor(
    http: HttpClient,
    favoriteService: FavoriteService,
    caching: CachingService
  ) {
    super(http, caching, favoriteService, "starships");
  }
}
