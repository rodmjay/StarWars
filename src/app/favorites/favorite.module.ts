import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { FavoriteListComponent } from './favorite-list.component';
import { SortablejsModule } from 'ngx-sortablejs';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SortablejsModule,
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
