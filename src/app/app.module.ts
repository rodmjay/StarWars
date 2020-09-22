import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

import { SortablejsModule } from 'ngx-sortablejs';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SortablejsModule.forRoot({animation: 150})
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
