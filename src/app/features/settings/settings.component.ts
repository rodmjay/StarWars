import { Component, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { SettingService } from 'src/app/core/services/settings.services';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

  vm$ = combineLatest([this.settingService.settings$])
    .pipe(
      map(([settings]) => ({
        settings
      }))
    );

  constructor(private settingService: SettingService) {

  }
}
