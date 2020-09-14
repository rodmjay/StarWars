import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PersonService } from './person.service';
import { EMPTY, combineLatest, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PlanetService } from '../planets/planet.service';
import { Person } from './person';

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
      tap(x => console.log(x)),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );


  refresh() {
    console.log('actions', [this.page, this.size, this.filter]);
    this.personService.refresh(this.page, this.size, this.filter);
  }

  search(filter: string) {
    if (filter !== this.filter) {
      this.page = 1;
    }
    this.refresh();
  }

  clear() {
    this.pageSize = 5;
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

  constructor(private personService: PersonService) {
  }
}
