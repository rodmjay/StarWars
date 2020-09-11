import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PersonService } from './person.service';
import { EMPTY, combineLatest } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PlanetService } from '../planets/planet.service';

@Component({
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonListComponent {
  pageTitle = 'Person List';
  errorMessage = '';

  people$ = this.personService.peopleWithHomeWorld$
    .pipe(
      tap(x => console.log(x)),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  constructor(private personService: PersonService, private planetService: PlanetService) {

  }
}
