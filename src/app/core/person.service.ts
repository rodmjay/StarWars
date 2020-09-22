import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, combineLatest, Subject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CachingService } from 'src/app/shared/caching/caching.service';
import { FavoriteService } from 'src/app/core/favorite.service';
import { BaseService } from 'src/app/shared/base.service';
import { Person, Wrapper } from 'src/app/shared/models';
import { PlanetService } from './planet.service';

@Injectable()
export class PersonService extends BaseService<Person> {


  private personSelectedAction = new Subject<string>();
  personSelectedAction$ = this.personSelectedAction.asObservable();

  people$ = combineLatest([
    this.planetService.allItems$,
    this.listActions$,
    this.favoriteService.favoritePeople$]).pipe(
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

  selectedPerson$ = combineLatest([this.personSelectedAction$, this.people$]).pipe(
    map(([personId, people]) => people.results.find(person => person.url === personId)),
    catchError(this.handleError)
  );

  changeSelectedPerson(personId: string): void {
    this.personSelectedAction.next(personId);
  }

  constructor(
    http: HttpClient,
    private planetService: PlanetService,
    favoriteService: FavoriteService,
    caching: CachingService) {
    super(http, caching, favoriteService, 'people');
  }

}
