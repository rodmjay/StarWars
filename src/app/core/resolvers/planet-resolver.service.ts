import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {  PlanetResolved } from 'src/app/core/models';
import { PlanetService } from '../services/planet.service';

@Injectable()
export class PlanetResolver implements Resolve<PlanetResolved> {

  constructor(private planetService: PlanetService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : PlanetResolved | Observable<PlanetResolved> | Promise<PlanetResolved> {

    const id = route.paramMap.get('id');

    if (isNaN(+id)) {
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return of({ planet: null, error: message });
    }

    return this.planetService.getPlanet(+id).pipe(
      tap(planet => console.log('retrieving', planet)),
      map(planet => ({ planet }))
    );
  }

}
