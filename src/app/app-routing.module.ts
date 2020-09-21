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
          import('./features/people/person.module').then(m => m.PersonModule)
      },
      {
        path: 'planets',
        loadChildren: () =>
          import('./features/planets/planet.module').then(m => m.PlanetModule)
      },
      {
        path: 'starships',
        loadChildren: () =>
          import('./features/starships/starship.module').then(m => m.StarshipModule)
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./features/favorites/favorite.module').then(m => m.FavoritesModule)
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
