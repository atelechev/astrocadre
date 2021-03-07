import { Component } from '@angular/core';
import { ThemeMeta } from 'src/app/modules2/core/models/theme-meta';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { ThemeService } from 'src/app/modules2/core/services/theme.service';


@Component({
  selector: `ac-controls-select-theme`,
  templateUrl: './selector-theme.component.html',
  styleUrls: ['../controls-common.css']
})
export class SelectorThemeComponent {

  constructor(
    private readonly _themeService: ThemeService
  ) {

  }

  public get themes(): Array<ThemeMeta> {
    return this._themeService.availableThemes;
  }

  public themeSelected(code: string): void {
    this._themeService.loadTheme(code);
  }

}
