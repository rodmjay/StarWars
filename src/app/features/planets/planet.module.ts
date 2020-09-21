import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlanetListComponent } from './planet-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlanetListComponent
      },
    ])
  ],
  declarations: [
    PlanetListComponent
  ]
})
export class PlanetModule { }
