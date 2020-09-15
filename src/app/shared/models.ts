
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
