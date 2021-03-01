import { Component, OnInit } from '@angular/core';
import { StaticDataService } from '#core/static-data.service';
import { TreeNode } from '#core/tree-node';
import { Theme } from '#core-theme/theme';
import { ThemeDefinition } from '#core-theme/theme-definition';
import { ThemesEventService } from '#core-theme/themes-event.service';

@Component({
  selector: 'app-astrocadre-themes',
  template: ``
})
export class ThemesComponent implements OnInit {

  private loadedThemes: Map<string, Theme>;

  private activeTheme: string;

  constructor(private dataService: StaticDataService,
    private themesEventService: ThemesEventService) {
    this.loadedThemes = new Map<string, Theme>();
    this.loadThemes();
  }

  public getActiveTheme(): Theme {
    return this.loadedThemes.get(this.activeTheme);
  }

  public ngOnInit(): void {
    this.subscribeThemeLoadRequestEvent();
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

  private loadThemes(): void {
    this.dataService.getAvailableThemes().subscribe(
      (themes: TreeNode[]) => {
        const copyThemes = themes.map(item => {
          const themeNode = TreeNode.from(item);
          themeNode.selected = false;
          return themeNode;
        });
        if (copyThemes.length > 0) {
          copyThemes[0].selected = true;
          this.loadTheme(copyThemes[0].code);
          this.themesEventService.themesListLoaded(copyThemes);
        } else {
          throw new Error('Unexpected state: no themes registered as available!');
        }
      }
    );
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

}