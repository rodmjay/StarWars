import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CachingService } from 'src/app/shared/caching/caching.service';
import { Person, Planet, Starship } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private favoritePeopleKey = 'favorite-people';
  private favoriteStarshipsKey = 'favorite-starships';
  private favoritePlanetsKey = 'favorite-planets';

  favoritesPlanetSubject = new BehaviorSubject(this.planets);
  favoritesPersonSubject = new BehaviorSubject(this.people);
  favoritesStarshipsSubject = new BehaviorSubject(this.starships);

  favoritePlanets$ = this.favoritesPlanetSubject.asObservable();
  favoritePeople$ = this.favoritesPersonSubject.asObservable();
  favoriteStarships$ = this.favoritesStarshipsSubject.asObservable();

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

  set starships(value: Starship[]) {
    this.favoritesStarshipsSubject.next(value);
    this.caching.setItem<Starship[]>(this.favoriteStarshipsKey, value);
  }

  get starships(): Starship[] {
    let starships = this.caching.getItem<Starship[]>(this.favoriteStarshipsKey);
    if (starships === null) {
      starships = [];
    }
    return starships;
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

  addFavoriteStarship(starship: Starship) {

    const arr = this.starships;

    if (arr.find(x => x.url === starship.url) === undefined) {
      arr.push(starship);
      this.starships = arr;
    }
  }

  removeFavoriteStarship(starship: Starship) {
    this.starships = this.starships.filter(x => x.url !== starship.url);
  }
}
