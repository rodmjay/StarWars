import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planet } from 'src/app/core/models';

@Component({
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetDetailsComponent implements OnInit {

  pageTitle: string;
  errorMessage: string;
  planet: Planet;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data) => {
        console.log('data', data);
        this.planet = data.planet;
        this.errorMessage = data.errorMessage;
        this.onPlanetRetrieved(data.planet);
      }
    );
  }

  onPlanetRetrieved(planet: Planet): void {
    this.planet = planet;
    if (!this.planet) {
      this.pageTitle = 'No planet found';
    }
  }

}
