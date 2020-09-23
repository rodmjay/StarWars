import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CachingService } from 'src/app/core/services/caching.service';
import { Person, Planet, Starship } from 'src/app/core/models';

@Injectable()
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
    this.caching.setItem<Person[]>(this.favoritePeopleKey, value);
    this.favoritesPersonSubject.next(value);
  }

  get people(): Person[] {
    return this.caching.getItem<Person[]>(this.favoritePeopleKey) || [];
  }

  set planets(value: Planet[]) {
    this.favoritesPlanetSubject.next(value);
    this.caching.setItem<Planet[]>(this.favoritePlanetsKey, value);
  }

  get planets(): Planet[] {
    return this.caching.getItem<Planet[]>(this.favoritePlanetsKey) || [];
  }

  set starships(value: Starship[]) {
    this.favoritesStarshipsSubject.next(value);
    this.caching.setItem<Starship[]>(this.favoriteStarshipsKey, value);
  }

  get starships(): Starship[] {
    return this.caching.getItem<Starship[]>(this.favoriteStarshipsKey) || [];
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
