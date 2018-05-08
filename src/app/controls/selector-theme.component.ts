import { Component, AfterViewInit } from '@angular/core';
import { SelectableItem } from './selectable-item';
import { Themes } from '../core/themes';
import { ThemesEventService } from '../themes/themes-event.service';


@Component({
  selector: `app-sky-view-controls-select-theme`,
  templateUrl: './selector-theme.component.html',
  styleUrls: [ './controls.component.css' ],
  providers: []
})
export class SelectorThemeComponent implements AfterViewInit {

  public availableThemes: Array<SelectableItem>;

  constructor(private themesEventService: ThemesEventService) {
    this.availableThemes = this.initAvailableThemes();
  }

  private initAvailableThemes(): Array<SelectableItem> {
    return [
      new SelectableItem(Themes.DEV, 'Dev', 'Used during development phase', true),
      new SelectableItem(Themes.SKY_CHART, 'Sky chart', 'Theme resembling standard sky charts', false)
    ];
  }

  private getSelectedTheme(): SelectableItem {
    const selected = this.availableThemes.find(item => item.selected);
    if (selected) {
      return selected;
    }
    if (this.availableThemes.length > 0) {
      return this.availableThemes[0];
    }
    throw new Error('Unexpected state: no themes registered as available!');
  }

  public fireThemeChangedEvent(themeCode: string): void {
    this.themesEventService.loadThemeRequested(themeCode);
  }

  public ngAfterViewInit(): void {
    this.fireThemeChangedEvent(this.getSelectedTheme().code);
  }

}
