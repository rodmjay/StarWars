
export interface Response<T> {
  results: T;
  count: number;
  next: string;
}

export interface Paging {
  page: number;
  size: number;
}

export interface Wrapper<T> {
  page: number;
  size: number;
  pages: number;
  results: T;
}
