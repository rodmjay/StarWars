import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CachingService } from '../shared/caching/caching.service';
import { Settings } from '../shared/models';

@Injectable()
export class SettingService {

  private settingsSubject = new BehaviorSubject<Settings>(this.settings);
  settings$ = this.settingsSubject.asObservable();

  private _settings: Settings;

  constructor(private storage: CachingService) {
    this._settings = this.storage.getItem<Settings>('settings') || {
      pageSize: 5
    };
  }

  get settings(): Settings {
    return this._settings;
  }

  set settings(value: Settings) {
    this._settings = value;
    this.storage.setItem<Settings>('settings', value);
  }
}
