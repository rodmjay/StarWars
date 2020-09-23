import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      {
        path: 'people',
        loadChildren: () =>
          import('./people/person.module').then(m => m.PersonModule)
      },
      {
        path: 'planets',
        loadChildren: () =>
          import('./planets/planet.module').then(m => m.PlanetModule)
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'starships',
        loadChildren: () =>
          import('./starships/starship.module').then(m => m.StarshipModule)
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./favorites/favorite.module').then(m => m.FavoritesModule)
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then(m => m.UserModule)
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
