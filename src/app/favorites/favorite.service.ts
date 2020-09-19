import { Injectable } from '@angular/core';
import { CachingService } from '../caching/caching.service';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../people/person';
import { Planet } from '../planets/planet';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private favoritePeopleKey = 'favorite-people';
  private favoritePlanetsKey = 'favorite-planets';

  favoritesPlanetSubject = new BehaviorSubject(this.planets);
  favoritesPersonSubject = new BehaviorSubject(this.people);

  favoritePlanets$ = this.favoritesPlanetSubject.asObservable();
  favoritePeople$ = this.favoritesPersonSubject.asObservable();

  constructor(private caching: CachingService) {
  }

  set people(value: Person[]) {
    this.favoritesPersonSubject.next(value);
    this.caching.setItem<Person[]>(this.favoritePeopleKey, value);
  }

  get people(): Person[] {
    let ppl = this.caching.getItem<Person[]>(this.favoritePeopleKey);
    if (ppl === null) {
      ppl = [];
    }
    return ppl;
  }

  set planets(value: Planet[]) {
    this.favoritesPlanetSubject.next(value);
    this.caching.setItem<Planet[]>(this.favoritePlanetsKey, value);
  }

  get planets(): Planet[] {
    let ppl = this.caching.getItem<Planet[]>(this.favoritePlanetsKey);
    if (ppl === null) {
      ppl = [];
    }
    return ppl;
  }

  addFavoritePerson(person: Person) {

    const arr = this.people;

    if (arr.find(x => x.url === person.url) === undefined) {
      arr.push(person);
      this.people = arr;
    }
  }

  removeFavoritePerson(person: Person) {
    this.people = this.people.filter(x => x.url !== person.url);
  }

  addFavoritePlanet(planet: Planet) {

    const arr = this.planets;

    if (arr.find(x => x.url === planet.url) === undefined) {
      arr.push(planet);
      this.planets = arr;
    }
  }

  removeFavoritePlanet(planet: Planet) {
    this.planets = this.planets.filter(x => x.url !== planet.url);
  }

}
