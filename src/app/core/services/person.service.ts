import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CachingService } from 'src/app/core/services/caching.service';
import { FavoriteService } from 'src/app/core/services/favorite.service';
import { BaseService } from 'src/app/core/bases/base.service';
import { Person } from 'src/app/core/models';
import { PlanetService } from './planet.service';
import { environment as env } from 'src/environments/environment';

@Injectable()
export class PersonService extends BaseService<Person> {

  private personUrl = `${env.apiUrl}/api/people`;

  private personSelectedAction = new BehaviorSubject<number>(1);
  selectedPerson$ = this.personSelectedAction.asObservable();

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
              id: +person.url.split('/')[5],
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

  getPerson(id: number): Observable<Person> {
    const url = `${this.personUrl}/${id}`;
    return this.http.get<Person>(url)
      .pipe(
        map(person => ({
          ...person,
          id: +person.url.split('/')[5],
        })),
        catchError(this.handleError)
      );
  }

  changeSelectedPerson(personId: number): void {
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
