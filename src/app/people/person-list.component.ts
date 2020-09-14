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

  people$ = this.personService.people$
    .pipe(
      tap(x => console.log(x)),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  search() {
    console.log('filter', this.filter);
    this.personService.peoplefiltered(this.filter);
  }

  clear() {
    this.filter = '';
    this.search();
  }

  constructor(private personService: PersonService) {
  }
}
