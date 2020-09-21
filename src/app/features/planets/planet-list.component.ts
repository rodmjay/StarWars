import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PlanetService } from './planet.service';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FavoriteService } from 'src/app/favorites/favorite.service';
import { Planet } from 'src/app/shared/models';

@Component({
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetListComponent {

  pageTitle = 'Planet List';
  errorMessage = '';
  filter = '';
  page = 1;
  size = 5;

  planets$ = this.planetService.planets$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );


  refresh() {
    this
      .planetService
      .refresh(this.page, this.size, this.filter);
  }


  search(filter: string) {
    if (filter !== this.filter) {
      this.page = 1;
    }
    this.refresh();
  }

  clear() {
    this.size = 5;
    this.page = 1;
    this.filter = '';
    this.refresh();
  }

  setPage(page: number) {
    this.page = page;
    this.refresh();
  }

  next() {
    this.page++;
    this.refresh();
  }

  prev() {
    this.page--;
    this.refresh();
  }

  addFavorite(planet: Planet) {
    this.favorites.addFavoritePlanet(planet);
  }

  removeFavorite(planet: Planet) {
    this.favorites.removeFavoritePlanet(planet);
  }

  constructor(private planetService: PlanetService, private favorites: FavoriteService) {

  }
}
