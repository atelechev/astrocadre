import { Component, OnInit } from '@angular/core';
import { Theme } from '../core/theme/theme';
import { StaticDataService } from '../core/static-data-service';
import { ThemeDefinition } from '../core/theme/theme-definition';
import { ThemesEventService } from '../core/theme/themes-event.service';

@Component({
  selector: 'app-sky-view-themes',
  template: ``,
  providers: []
})
export class ThemesComponent implements OnInit {

  private loadedThemes: Map<string, Theme>;

  private activeTheme: string;

  constructor(private dataService: StaticDataService,
              private themesEventService: ThemesEventService) {
    this.loadedThemes = new Map<string, Theme>();
  }

  private loadTheme(theme: string): void {
    this.dataService.getThemeDefinition(theme).subscribe(
      (themeDef: ThemeDefinition) => {
        this.loadedThemes.set(theme, new Theme(themeDef));
        this.activeTheme = theme;
        this.themesEventService.themeLoaded(theme);
      },
      (error) => console.error(`Failed to load theme '${theme}': ${error}`)
    );
  }

  public getActiveTheme(): Theme {
    return this.loadedThemes.get(this.activeTheme);
  }

  private subscribeThemeLoadRequestEvent(): void {
    this.themesEventService.requestThemeLoad$.subscribe(
      (theme: string) => {
        if (!this.loadedThemes.has(theme)) {
          this.loadTheme(theme);
        } else {
          this.activeTheme = theme;
          this.themesEventService.themeLoaded(theme);
        }
      }
    );
  }

  public ngOnInit(): void {
    this.subscribeThemeLoadRequestEvent();
  }

}
