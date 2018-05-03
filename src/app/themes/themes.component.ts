import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { Theme } from '../core/theme';
import { ThemesService } from './themes.service';
import { ThemeDefinition } from '../core/theme-definition';

@Component({
  selector: 'app-sky-view-themes',
  template: ``,
  providers: [
    ThemesService
  ]
})
export class ThemesComponent implements OnChanges {

  private loadedThemes: Map<string, Theme>;

  @Input()
  private activeTheme: string;

  @Output()
  private themeLoaded = new EventEmitter<string>();

  constructor(private themesService: ThemesService) {
    this.loadedThemes = new Map<string, Theme>();
  }

  private loadTheme(theme: string): void {
    this.themesService.getThemeDefinition(theme).subscribe(
      (themeDef: ThemeDefinition) => {
        this.loadedThemes.set(theme, new Theme(themeDef));
        this.themeLoaded.emit(theme);
      },
      (error) => console.error(`Failed to load theme '${theme}': ${error}`)
    );
  }

  public getActiveTheme(): Theme {
    return this.loadedThemes.get(this.activeTheme);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.activeTheme) {
      if (!this.loadedThemes.has(this.activeTheme)) {
        this.loadTheme(this.activeTheme);
      } else {
        this.themeLoaded.emit(this.activeTheme);
      }
    }
  }

}
