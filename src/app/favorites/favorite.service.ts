import { Injectable } from '@angular/core';
import { CachingService } from '../caching/caching.service';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../people/person';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favoritesSubject = new BehaviorSubject(this.people);
  favorites$ = this.favoritesSubject.asObservable();

  constructor(private caching: CachingService) {

  }

  set people(value: Person[]) {

    console.log('peopleToAdd', value);

    this.favoritesSubject.next(value);
    this.caching.setItem<Person[]>('favorites', value);
  }

  get people(): Person[] {
    let ppl = this.caching.getItem<Person[]>('favorites');
    if (ppl === null) {
      ppl = [];
      this.people = [];
    }
    console.log('ppl', ppl);
    return ppl;
  }

  addFavorite(person: Person) {

    const arr = this.people;

    if (arr.find(x => x.url === person.url) === undefined) {

      arr.push(person);

      this.people = arr;
    }
  }

  removeFavorite(person: Person) {

    let arr = this.people;

    arr = arr.filter(x => x.url !== person.url);

    this.people = arr;

  }

}