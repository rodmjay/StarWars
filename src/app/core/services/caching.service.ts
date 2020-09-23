import { Injectable } from '@angular/core';

@Injectable()
export class CachingService {

  constructor() { }

  setItem<T>(key: string, item: T): void {
    localStorage.setItem(key, JSON.stringify(item));
  }

  getItem<T>(key: string): T {
    const data: any = localStorage.getItem(key);

    if (!data) { return null; }

    let obj: T;

    try {
      obj = JSON.parse(data) as T;
    } catch (error) {
      obj = null;
    }

    return obj;
  }
}
