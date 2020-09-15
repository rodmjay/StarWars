import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { FavoriteListComponent } from './favorite-list.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: FavoriteListComponent
      },
    ])
  ],
  declarations: [
    FavoriteListComponent
  ]
})
export class FavoritesModule { }
