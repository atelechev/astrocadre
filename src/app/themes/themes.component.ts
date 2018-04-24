import { Component } from '@angular/core';
import { Theme } from './theme';
import { Themes } from './themes';
import { ThemesService } from './themes.service';
import { ThemeDefinition } from './theme-definition';
import { Observable } from 'rxjs/Observable';

@Component({
  template: ``,
  providers: [
    ThemesService
  ]
})
export class ThemesComponent {

  private activeTheme: Theme;

  constructor(private themesService: ThemesService) {

  }

  public getActiveTheme(): Theme {
    if (!this.activeTheme) {
      throw new Error('Illegal call: no theme is yet set as active!');
    }
    return this.activeTheme;
  }

  public loadTheme(theme: Themes): Observable<Theme> {
    return this.themesService.getThemeDefinition(theme)
      .map((themeDef: ThemeDefinition) => {
        const loadedTheme = new Theme(themeDef);
        this.activeTheme = loadedTheme;
        console.log(`Active theme set to '${theme}'`); // TODO remove
        return loadedTheme;
      });
  }

}
