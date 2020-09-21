
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
  birth_year: string;
  homeworld: string;
  homeworld_name: string;
  url: string;
}

export interface Planet {
  name: string;
  url: string;
}

