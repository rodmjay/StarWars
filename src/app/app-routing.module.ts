import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
        path: 'favorites',
        loadChildren: () =>
          import('./favorites/favorite.module').then(m => m.FavoritesModule)
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
