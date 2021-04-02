import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from '#core/models/theme';
import { ThemeMeta } from '#core/models/theme-meta';


@Injectable()
export class ThemeService {

  private readonly _themeChanged: BehaviorSubject<Theme>;

  private _availableThemes: Array<ThemeMeta>;

  private _theme: Theme;

  constructor() {
    this._themeChanged = new BehaviorSubject<Theme>(undefined);
    this._availableThemes = [];
    this._theme = undefined;
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
    const previous = this._theme;
    if (previous !== theme) {
      this._theme = theme;
      this._themeChanged.next(theme);
    }
  }

  public get themeChanged(): Observable<Theme> {
    return this._themeChanged;
  }

}
