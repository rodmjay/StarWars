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
  people$: Observable<Person[]>;
  filter = '';

  search() {
    this.people$ = this.personService.getPeopleWithHomeworld(this.filter)
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      );
  }

  clear() {
    this.filter = '';
    this.search();
  }

  constructor(private personService: PersonService, private planetService: PlanetService) {

    this.search();
  }
}
