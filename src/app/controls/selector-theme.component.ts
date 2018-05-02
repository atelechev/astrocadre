import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SelectableItem } from './selectable-item';
import { Themes } from '../core/themes';


@Component({
  selector: `app-sky-view-controls-select-theme`,
  templateUrl: './selector-theme.component.html',
  styleUrls: [ './controls.component.css' ],
  providers: []
})
export class SelectorThemeComponent implements AfterViewInit {

  @Output()
  private themeChanged = new EventEmitter<any>();

  public availableThemes: Array<SelectableItem>;

  constructor() {
    this.availableThemes = this.initAvailableThemes();
  }

  private initAvailableThemes(): Array<SelectableItem> {
    return [
      new SelectableItem(Themes[Themes.dev], 'Dev', 'Used during development phase', true),
      new SelectableItem(Themes[Themes.sky_chart], 'Sky chart', 'Theme resembling standard sky charts', false)
    ];
  }

  public getSelectedTheme(): SelectableItem {
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
    this.themeChanged.emit({ code: themeCode });
  }

  public ngAfterViewInit(): void {
    this.fireThemeChangedEvent(this.getSelectedTheme().code);
  }

}
