import { Component, OnInit } from '@angular/core';
import { Theme } from './theme';
import { ThemeDevService } from './theme-dev.service';
import { Themes } from './themes';
import { ThemeSkyChartService } from './theme-skychart.service';

@Component({
  template: ``,
  providers: [
    ThemeDevService,
    ThemeSkyChartService
  ]
})
export class ThemesComponent {

  private activeTheme: Theme;

  private themesByName: Map<string, Theme>;

  constructor(devTheme: ThemeDevService,
              skyChartTheme: ThemeSkyChartService) {
    this.activeTheme = skyChartTheme; // TODO must be initialized externally
    this.themesByName = new Map<string, Theme>();
    this.themesByName.set(devTheme.getName(), devTheme);
    this.themesByName.set(skyChartTheme.getName(), skyChartTheme);
  }

  public getActiveTheme(): Theme {
    return this.activeTheme;
  }

  public setActiveTheme(name: string): void {
    if (!this.themesByName.get(name)) {
      throw new Error(`Unexpected theme name: '${name}'`);
    }
    this.activeTheme = this.themesByName.get(name);
  }

}