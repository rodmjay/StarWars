import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PersonService } from './person.service';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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

  options = [{ value: 5 }, { value: 10 }, { value: 15 }];

  people$ = this.personService.people$
    .pipe(
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

  constructor(private personService: PersonService) {
  }
}
