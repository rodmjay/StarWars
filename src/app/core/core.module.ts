import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { FavoriteService } from './services/favorite.service';
import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { PersonService } from './services/person.service';
import { PlanetService } from './services/planet.service';
import { SettingService } from './services/settings.services';
import { StarshipService } from './services/starship.service';
import { PersonResolver } from './resolvers/person-resolver.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    FavoriteService,
    PersonService,
    PlanetService,
    StarshipService,
    SettingService,
    AuthService,
    AuthGuard,
    PersonResolver
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
