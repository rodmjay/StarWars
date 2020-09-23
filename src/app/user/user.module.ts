import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserDetailsComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
    ])
  ],
  declarations: [
    UserDetailsComponent,
    LoginComponent
  ]
})
export class UserModule { }
