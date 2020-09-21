import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FavoriteListComponent } from './favorite-list.component';
import { SortablejsModule } from 'ngx-sortablejs';

@NgModule({
  imports: [
    SharedModule,
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
