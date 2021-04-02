import { Component } from '@angular/core';
import { ThemeMeta } from '#core/models/theme-meta';
import { ThemeService } from '#core/services/theme.service';
import { LoaderService } from '#core/services/loader.service';


@Component({
  selector: `ac-controls-select-theme`,
  templateUrl: './selector-theme.component.html'
})
export class SelectorThemeComponent {

  private _selectedTheme: ThemeMeta;

  constructor(
    private readonly _themeService: ThemeService,
    private readonly _loaderService: LoaderService
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
      this._loaderService.loadTheme(this._selectedTheme.code);
    }
  }

}
