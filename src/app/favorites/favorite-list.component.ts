import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FavoriteService } from '../favorites/favorite.service';
import { SortablejsOptions } from 'ngx-sortablejs';
import { Person } from '../people/person';

@Component({
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteListComponent {
  pageTitle = 'Favorite People';
  errorMessage = '';

  public people: Person[];

  constructor(private favorites: FavoriteService) {
  }

  eventOptions: SortablejsOptions = {
    onUpdate: () => {
      this.favorites.people = this.people;
    }
  };

  favorites$ = this.favorites.favorites$.pipe(
    tap(x => this.people = x),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
}
