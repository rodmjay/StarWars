import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Person, PersonResolved } from "src/app/core/models";

@Component({
  templateUrl: "./person-details.component.html",
  styleUrls: ["./person-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonDetailsComponent implements OnInit {
  pageTitle: string;
  errorMessage: string;
  person: Person;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.person = data.person;
      this.errorMessage = data.errorMessage;
      this.onPersonRetrieved(data.person);
    });
  }

  onPersonRetrieved(person: Person): void {
    this.person = person;

    if (!this.person) {
      this.pageTitle = "No product found";
    }
  }
}
