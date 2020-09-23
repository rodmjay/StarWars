import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { PersonResolver } from 'src/app/core/resolvers/person-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PersonListComponent
      },
      {
        path: ':id',
        component: PersonDetailsComponent,
        resolve: { person: PersonResolver }
      },
    ])
  ],
  declarations: [
    PersonDetailsComponent,
    PersonListComponent
  ]
})
export class PersonModule { }
