import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PersonService } from 'src/app/core/services/person.service';
import { combineLatest, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Person } from 'src/app/shared/models';
import { FavoriteService } from 'src/app/core/services/favorite.service';
import { environment as env } from 'src/environments/environment';

@Component({
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonListComponent {
  pageTitle = 'Person List';
  errorMessage = '';
  filter = '';
  page = 1;
  size = env.pageSize;

  vm$ = combineLatest([this.personService.people$]).pipe(
    map(([people]) => ({ people })),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  refresh() {
    this.personService
      .refresh(this.page, this.size, this.filter);
  }


  search(value: string) {
    if (value !== this.filter) {
      this.page = 1;
    }
    this.refresh();
  }

  clear() {
    this.size = env.pageSize;
    this.page = 1;
    this.filter = '';
    this.refresh();
  }

  setPage(page: number) {
    this.page = page;
    this.refresh();
  }

  onSelected(personId: number): void {
    this.personService.changeSelectedPerson(personId);
  }

  addFavorite(person: Person) {
    this.favorites.addFavoritePerson(person);
  }

  removeFavorite(person: Person) {
    this.favorites.removeFavoritePerson(person);
  }

  constructor(private personService: PersonService, private favorites: FavoriteService) {

  }
}
