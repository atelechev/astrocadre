import { Component } from '@angular/core';
import { TreeNode } from '#core/models/tree-node';
import { ThemesEventService } from '#core/services/themes-event.service';


@Component({
  selector: `ac-controls-select-theme`,
  templateUrl: './selector-theme.component.html',
  styleUrls: ['../controls/controls.component.css']
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
