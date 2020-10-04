import { Component, ChangeDetectionStrategy } from "@angular/core";

import { combineLatest, EMPTY } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Starship } from "src/app/core/models";
import { FavoriteService } from "src/app/core/services/favorite.service";
import { StarshipService } from "src/app/core/services/starship.service";
import { environment as env } from "src/environments/environment";

@Component({
  templateUrl: "./starship-list.component.html",
  styleUrls: ["./starship-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipListComponent {
  pageTitle = "Starship List";
  errorMessage = "";
  filter = "";
  page = 1;
  size = 10;

  vm$ = combineLatest([this.starshipService.starships$]).pipe(
    map(([starships]) => ({
      starships,
    })),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  addFavorite(starship: Starship) {
    this.favorites.addFavoriteStarship(starship);
  }

  removeFavorite(starship: Starship) {
    this.favorites.removeFavoriteStarship(starship);
  }

  refresh() {
    this.starshipService.refresh(this.page, this.size, this.filter);
  }

  search(filter: string) {
    if (filter !== this.filter) {
      this.page = 1;
    }
    this.refresh();
  }

  clear() {
    this.size = env.pageSize;
    this.page = 1;
    this.filter = "";
    this.refresh();
  }

  setPage(page: number) {
    this.page = page;
    this.refresh();
  }

  constructor(
    private starshipService: StarshipService,
    private favorites: FavoriteService
  ) {}
}
