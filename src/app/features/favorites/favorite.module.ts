import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavoriteListComponent } from './favorite-list.component';
import { SortablejsModule } from 'ngx-sortablejs';
import { SharedModule } from 'src/app/shared/shared.module';

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
