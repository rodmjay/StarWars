import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FavoriteService } from './favorite.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { PersonService } from './person.service';
import { PlanetService } from './planet.service';
import { StarshipService } from './starship.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    FavoriteService,
    PersonService,
    PlanetService,
    StarshipService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
