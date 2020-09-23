import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlanetListComponent } from './planet-list/planet-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';
import { PlanetResolver } from '../core/resolvers/planet-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlanetListComponent
      },
      {
        path: ':id',
        component: PlanetDetailsComponent,
        resolve: { planet: PlanetResolver }
      },
    ])
  ],
  declarations: [
    PlanetListComponent,
    PlanetDetailsComponent
  ]
})
export class PlanetModule { }
