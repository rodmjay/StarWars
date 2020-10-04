import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { StarshipResolved } from "../models";
import { StarshipService } from "../services/starship.service";

@Injectable()
export class StarshipResolver implements Resolve<StarshipResolved> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | StarshipResolved
    | Observable<StarshipResolved>
    | Promise<StarshipResolved> {
    const id = route.paramMap.get("id");

    if (isNaN(+id)) {
      const message = `Starship id was not a number: ${id}`;
      console.error(message);
      return of({ starship: null, error: message });
    }

    return this.starshipService.getStarship(+id).pipe(
      tap((starship) => console.log("retrieving", starship)),
      map((starship) => ({ starship }))
    );
  }
  constructor(private starshipService: StarshipService) {}
}
