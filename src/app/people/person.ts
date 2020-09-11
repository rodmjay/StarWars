/* Defines the person entity */
export interface Person {
  name: string;
  birth_year: string;
  homeworld: string;
  homeworkd_name: string;
}


export interface Response<T> {
  results: T;
  count: number;
  next: string;
}
