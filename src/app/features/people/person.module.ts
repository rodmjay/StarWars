import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PersonListComponent } from './person-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PersonListComponent
      },
    ])
  ],
  declarations: [
    PersonListComponent
  ]
})
export class PersonModule { }
