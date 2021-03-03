import { Injectable } from '@angular/core';
import { Theme } from 'src/app/modules2/core/models/theme';
import { ThemeMeta } from 'src/app/modules2/core/models/theme-meta';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { StaticDataService } from 'src/app/modules2/core/services/static-data.service';


@Injectable()
export class ThemeService {

  private _availableThemes: Array<ThemeMeta>;

  private _theme: Theme;

  constructor(
    private readonly _dataService: StaticDataService,
    private readonly _eventsService: EventsService
  ) {
    this._availableThemes = [];
    this._theme = undefined;
  }

  public get availableThemes(): Array<ThemeMeta> {
    return this._availableThemes;
  }

  public get theme(): Theme {
    return this._theme;
  }

  public loadThemes(): void {
    this._dataService
      .getThemes()
      .toPromise()
      .then(
        (themes: Array<ThemeMeta>) => {
          this._availableThemes = themes || [];
          if (this._availableThemes.length > 0) {
            this.loadTheme(this._availableThemes[0].code);
          }
        },
        (err: any) => console.error(err)
      );
  }

  public loadTheme(code: string): void {
    if (!code) {
      return;
    }
    this._dataService
      .getTheme(code)
      .toPromise()
      .then(
        (theme: Theme) => {
          this._theme = theme;
          this._eventsService.fireThemeLoaded(this._theme);
        },
        (err: any) => console.error(err)
      );
  }

}
