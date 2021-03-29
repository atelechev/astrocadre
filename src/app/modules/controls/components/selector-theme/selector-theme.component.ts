import { Component } from '@angular/core';
import { ThemeMeta } from 'src/app/modules/core/models/theme-meta';
import { ThemeService } from 'src/app/modules/core/services/theme.service';


@Component({
  selector: `ac-controls-select-theme`,
  templateUrl: './selector-theme.component.html'
})
export class SelectorThemeComponent {

  private _selectedTheme: ThemeMeta;

  constructor(
    private readonly _themeService: ThemeService
  ) {
    this._selectedTheme = undefined;
  }

  public get themes(): Array<ThemeMeta> {
    return this._themeService.availableThemes;
  }

  public get selectedTheme(): ThemeMeta {
    return this._selectedTheme;
  }

  public set selectedTheme(theme: ThemeMeta) {
    const previous = this._selectedTheme;
    this._selectedTheme = theme;
    if (this._selectedTheme && this._selectedTheme !== previous) {
      this._themeService.loadTheme(this._selectedTheme.code);
    }
  }

}
