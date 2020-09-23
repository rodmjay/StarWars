
export interface Response<T> {
  results: T;
  count: number;
  next: string;
}

export interface Wrapper<T> {
  page: number;
  size: number;
  pages: number;
  results: T;
  totalFavorites: number;
}

export interface Starship {
  name: string;
  url: string;
}

/* Defines the person entity */
export interface Person {
  name: string;
  id: number;
  birth_year: string;
  homeworld: string;
  homeworld_name: string;
  url: string;
}

export interface PersonResolved {
  person: Person;
  error?: any;
}

export interface PlanetResolved {
  planet: Planet;
  error?: any;
}

export interface ViewModel<T> {
  model: T;
  error?: any;
}

export interface Planet {
  name: string;
  url: string;
  id: number;
}

export interface Settings {
  pageSize: number;
}

export interface User {
  id: number;
  userName: string;
  isAdmin: boolean;
}
