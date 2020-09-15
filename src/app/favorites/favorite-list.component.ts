import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FavoriteService } from '../favorites/favorite.service';

@Component({
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteListComponent {
  pageTitle = 'Favorite People';
  errorMessage = '';

  constructor(private favorites: FavoriteService) {

  }

  favorites$ = this.favorites.favorites$.pipe(
    tap(x => console.log('favorites'))
  );
}
