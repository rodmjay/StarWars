import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PersonService } from './person.service';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FavoriteService } from '../../favorites/favorite.service';
import { Person } from 'src/app/shared/models';


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
  size = 5;

  people$ = this.personService.people$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );


  refresh() {
    this.personService.refresh(this.page, this.size, this.filter);
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

  addFavorite(person: Person) {
    this.favorites.addFavoritePerson(person);
  }

  removeFavorite(person: Person) {
    this.favorites.removeFavoritePerson(person);
  }

  constructor(private personService: PersonService, private favorites: FavoriteService) {

  }
}
