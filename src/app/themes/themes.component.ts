import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Theme } from '../core/theme';
import { ThemesService } from './themes.service';
import { ThemeDefinition } from '../core/theme-definition';
import { ThemesEventService } from './themes-event.service';

@Component({
  selector: 'app-sky-view-themes',
  template: ``,
  providers: [
    ThemesService
  ]
})
export class ThemesComponent implements OnInit {

  private loadedThemes: Map<string, Theme>;

  private activeTheme: string;

  constructor(private themesService: ThemesService,
              private themesEventService: ThemesEventService) {
    this.loadedThemes = new Map<string, Theme>();
  }

  private loadTheme(theme: string): void {
    this.themesService.getThemeDefinition(theme).subscribe(
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
