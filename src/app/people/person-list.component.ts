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

  people$ = this.personService.getPeople()
    .pipe(
      tap(x => console.log(x)),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  constructor(private personService: PersonService) { }

}
