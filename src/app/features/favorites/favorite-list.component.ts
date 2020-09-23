import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FavoriteService } from '../../core/services/favorite.service';
import { Options } from 'sortablejs';
import { Person, Planet } from 'src/app/shared/models';

@Component({
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteListComponent {

  pageTitle = 'Favorites';
  errorMessage = '';

  public people: Person[];
  public planets: Planet[];

  constructor(private favorites: FavoriteService) {
  }

  favoritePeopleOptions: Options = {
    onUpdate: () => {
      this.favorites.people = this.people;
    }
  };

  favoritePlanetsOptions: Options = {
    onUpdate: () => {
      this.favorites.planets = this.planets;
    }
  };

  favoritePlanets$ = this.favorites.favoritePlanets$.pipe(
    tap(faves => this.planets = faves),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  favoritePeople$ = this.favorites.favoritePeople$.pipe(
    tap(faves => this.people = faves),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
}
