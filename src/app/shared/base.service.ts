import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, empty, Observable, of, throwError } from 'rxjs';
import { catchError, expand, map, reduce } from 'rxjs/operators';
import { CachingService } from 'src/app/shared/caching/caching.service';
import { FavoriteService } from '../core/services/favorite.service';
import { Response, Wrapper } from '../shared/models';
import { environment } from './../../environments/environment';

export class BaseService<T> {

  constructor(
    protected http: HttpClient, protected caching: CachingService, protected favoriteService: FavoriteService, private key: string) {
  }
  protected listSubject = new BehaviorSubject<{ page: number, size: number, filter: string }>
    ({ page: 1, size: 5, filter: '' });

  listActions$ = this.listSubject.asObservable();

  items$: Observable<Wrapper<T[]>>;

  allItems$: Observable<T[]> = this.getPage(this.getUrlWithSearch())
    .pipe(
      expand(data => {
        return data.next ? this.getPage(data.next) : empty();
      }),
      reduce((acc, data) => {
        return acc.concat(data.results);
      }, []),
      catchError(this.handleError)
    );

  protected getUrlWithSearch(filter: string = ''): string {
    return !!filter
      ? `${environment.apiUrl}/api/${this.key}/?format=json&search=${filter}`
      : `${environment.apiUrl}/api/${this.key}/?format=json`;
  }


  protected getPage(url: string): Observable<{ next: string, results: T[] }> {
    return this.http.get<Response<T[]>>(url).pipe(
      map(response => {
        return {
          next: response.next,
          results: response.results as T[]
        };
      })
    );
  }

  protected getItems(filter: string): Observable<T[]> {

    let retVal: T[];

    if (filter === '' && this.caching.getItem<T[]>(this.key)) {
      retVal = this.caching.getItem<T[]>(this.key);
      return of(retVal);
    }

    return this.getPage(this.getUrlWithSearch(filter)).pipe(
      expand(data => {
        return data.next ? this.getPage(data.next) : empty();
      }),
      reduce((acc, data) => {

        retVal = acc.concat(data.results);

        if (filter === '') {
          this.caching.setItem<T[]>(this.key, retVal);
        }

        return retVal;
      }, [])
    );
  }

  public refresh(page: number = 1, size: number = 5, filter: string = ''): void {
    this.listSubject.next({ page, size, filter });
  }

  protected getWrapper(page: number, size: number, favoriteSize: number, items: T[]): Wrapper<T[]> {
    return ({
      page,
      size,
      pages: Math.floor((items.length + size - 1) / size),
      results: items.slice((page - 1) * size, page * size),
      totalFavorites: favoriteSize
    } as Wrapper<T[]>);
  }

  protected handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log('error code', err);
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }


}
