import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, combineLatest } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Person } from './person';
import { Wrapper } from '../shared/models';
import { PlanetService } from '../planets/planet.service';
import { CachingService } from '../caching/caching.service';
import { FavoriteService } from '../favorites/favorite.service';
import { BaseService } from '../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends BaseService<Person> {

  people$: Observable<Wrapper<Person[]>> =
    combineLatest([this.planetService.allItems$, this.listActions$, this.favoriteService.favoritePeople$]).pipe(
      switchMap(([planets, actions, favorites]) => {
        return this.getItems(actions.filter).pipe(
          map(people => {

            // custom mapping logic
            const personList = people.map(person => ({
              ...person,
              isFavorite: favorites.findIndex(x => x.url === person.url) > -1,
              homeworld_name: planets.find(p => p.url === person.homeworld)
                .name
            }) as Person);

            return this.getWrapper(actions.page, actions.size, favorites.length, personList);
          })
        );
      }),
      catchError(this.handleError)
    );

  constructor(
    http: HttpClient,
    private planetService: PlanetService,
    favoriteService: FavoriteService,
    caching: CachingService) {
    super(http, caching, favoriteService, 'people');
  }
}
