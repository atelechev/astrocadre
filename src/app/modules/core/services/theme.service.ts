import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from '#core/models/theme';
import { ThemeMeta } from '#core/models/theme-meta';
import { themeDefault } from '#core/models/theme-default';


@Injectable()
export class ThemeService {

  // TODO add cache for loaded themes

  private readonly _themeChanged: BehaviorSubject<Theme>;

  private _availableThemes: Array<ThemeMeta>;

  private _theme: Theme;

  constructor() {
    this._theme = themeDefault;
    this._themeChanged = new BehaviorSubject<Theme>(themeDefault);
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
      this._themeChanged.next(useTheme);
    }
  }

  public get themeChanged(): Observable<Theme> {
    return this._themeChanged;
  }

}
