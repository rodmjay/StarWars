import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { StarshipListComponent } from './starship-list.component';

@NgModule({
  imports: [
    SharedModule,
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
