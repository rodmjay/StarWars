/* Defines the person entity */
export interface Person {
  name: string;
  birth_year: string;
}


export interface Response<T> {
  results: T;
  count: number;
  next: string;
}
