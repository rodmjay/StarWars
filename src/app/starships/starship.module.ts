import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { StarshipListComponent } from './starship-list.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: StarshipListComponent
      },
    ])
  ],
  declarations: [
    StarshipListComponent
  ]
})
export class StarshipModule { }
