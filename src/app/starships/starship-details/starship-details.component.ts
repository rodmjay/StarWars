import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Starship } from "src/app/core/models";

@Component({
  templateUrl: "./starship-details.component.html",
  styleUrls: ["./starship-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipDetailsComponent implements OnInit {
  pageTitle: string;
  errorMessage: string;
  starship: Starship;

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.data.subscribe((data) => {
      console.log("data", data);
      this.starship = data.starship;
      this.errorMessage = data.errorMessage;
      this.OnStarshipRetrieved(data.starship);
    });
  }

  OnStarshipRetrieved(starship: Starship): void {
    this.starship = starship;
    if (!this.starship) {
      this.pageTitle = "No starship found";
    }
  }
}
