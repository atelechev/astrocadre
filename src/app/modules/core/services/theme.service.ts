import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from '#core/models/theme/theme';
import { ThemeMeta } from '#core/models/theme/theme-meta';
import { themeDefault } from '#core/models/theme/theme-default';
import { ThemeEvent } from '#core/models/event/theme-event';
import { ThemeChangedEvent } from '#core/models/event/theme-changed-event';

/**
 * Holds the values of the themes that are available in the application,
 * and the value of the currently selected theme.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {

  private readonly _events: BehaviorSubject<ThemeEvent<any>>;

  private _availableThemes: Array<ThemeMeta>;

  private _theme: Theme;

  constructor() {
    this._theme = themeDefault;
    this._events = new BehaviorSubject<ThemeEvent<any>>(new ThemeChangedEvent(themeDefault));
    this._availableThemes = [];
  }

  /**
   * Returns the array of available themes.
   */
  public get availableThemes(): Array<ThemeMeta> {
    return this._availableThemes;
  }

  /**
   * Sets the available themes.
   */
  public set availableThemes(themes: Array<ThemeMeta>) {
    this._availableThemes = themes || [];
  }

  /**
   * Returns the theme which is selected in the app.
   */
  public get theme(): Theme {
    return this._theme;
  }

  /**
   * Sets the theme selection to the specified theme.
   *
   * If the new selection is different from the previous, triggers a theme changed event.
   */
  public set theme(theme: Theme) {
    const useTheme = !!theme ? theme : themeDefault;
    const previous = this._theme;
    if (previous !== useTheme) {
      this._theme = useTheme;
      this._events.next(new ThemeChangedEvent(useTheme));
    }
  }

  /**
   * Returns the Observable allowing to trace the theme events.
   */
  public get events(): Observable<ThemeEvent<any>> {
    return this._events;
  }

}
