import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Person, PersonResolved } from 'src/app/core/models';
import { PersonService } from '../services/person.service';

@Injectable()
export class PersonResolver implements Resolve<PersonResolved> {

  constructor(private personService: PersonService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : PersonResolved | Observable<PersonResolved> | Promise<PersonResolved> {

    const id = route.paramMap.get('id');

    if (isNaN(+id)) {
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return of({ person: null, error: message });
    }

    return this.personService.getPerson(+id).pipe(
      tap(person => console.log('retrieving', person)),
      map(person => ({ person }))
    );
  }

}
