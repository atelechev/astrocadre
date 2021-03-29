import { Injectable } from '@angular/core';
import { Theme } from '#core/models/theme';
import { ThemeMeta } from '#core/models/theme-meta';
import { EventsService } from '#core/services/events.service';
import { StaticDataService } from '#core/services/static-data.service';


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
    this.loadThemes();
  }

  public get availableThemes(): Array<ThemeMeta> {
    return this._availableThemes;
  }

  public get theme(): Theme {
    return this._theme;
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
          this._eventsService.fireThemeChanged(this._theme);
        },
        (err: any) => console.error(err)
      );
  }

  private loadThemes(): void {
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

}