import { Component, AfterViewInit } from '@angular/core';
import { ThemesEventService } from '../core/theme/themes-event.service';
import { StaticDataService } from '../core/static-data-service';
import { TreeNode } from '../core/tree-node';


@Component({
  selector: `app-astrocadre-controls-select-theme`,
  templateUrl: './selector-theme.component.html',
  styleUrls: [ './controls.component.css' ],
  providers: []
})
export class SelectorThemeComponent {

  public availableThemes: Array<TreeNode>;

  constructor(private themesEventService: ThemesEventService) {
    this.themesEventService.broadcastThemesListLoaded$.subscribe(
      (themes: Array<TreeNode>) => this.availableThemes = themes
    );
  }

  public fireThemeChangedEvent(themeCode: string): void {
    this.themesEventService.loadThemeRequested(themeCode);
  }

}
