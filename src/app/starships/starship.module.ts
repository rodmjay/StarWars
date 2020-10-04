import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { StarshipResolver } from "../core/resolvers/starship-resolver.service";
import { StarshipDetailsComponent } from "./starship-details/starship-details.component";
import { StarshipListComponent } from "./starship-list.component";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: "",
        component: StarshipListComponent,
      },
      {
        path: ":id",
        component: StarshipDetailsComponent,
        resolve: { starship: StarshipResolver },
      },
    ]),
  ],
  declarations: [StarshipListComponent, StarshipDetailsComponent],
})
export class StarshipModule {}
