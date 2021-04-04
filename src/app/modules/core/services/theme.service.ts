import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from '#core/models/theme/theme';
import { ThemeMeta } from '#core/models/theme/theme-meta';
import { themeDefault } from '#core/models/theme/theme-default';
import { ThemeEvent } from '#core/models/event/theme-event';
import { ThemeChangedEvent } from '#core/models/event/theme-changed-event';


@Injectable()
export class ThemeService {

  private readonly _events: BehaviorSubject<ThemeEvent<any>>;

  private _availableThemes: Array<ThemeMeta>;

  private _theme: Theme;

  constructor() {
    this._theme = themeDefault;
    this._events = new BehaviorSubject<ThemeEvent<any>>(new ThemeChangedEvent(themeDefault));
    this._availableThemes = [];
  }

  public get availableThemes(): Array<ThemeMeta> {
    return this._availableThemes;
  }

  public set availableThemes(themes: Array<ThemeMeta>) {
    this._availableThemes = themes || [];
  }

  public get theme(): Theme {
    return this._theme;
  }

  public set theme(theme: Theme) {
    const useTheme = !!theme ? theme : themeDefault;
    const previous = this._theme;
    if (previous !== useTheme) {
      this._theme = useTheme;
      this._events.next(new ThemeChangedEvent(useTheme));
    }
  }

  public get events(): Observable<ThemeEvent<any>> {
    return this._events;
  }

}
