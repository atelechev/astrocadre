import { Component, AfterViewInit } from '@angular/core';
import { SelectableItem } from './selectable-item';
import { Themes } from '../core/theme/themes';
import { ThemesEventService } from '../core/theme/themes-event.service';
import { ControlsService } from './controls.service';
import { SectionMetadata } from './section-metadata';


@Component({
  selector: `app-sky-view-controls-select-theme`,
  templateUrl: './selector-theme.component.html',
  styleUrls: [ './controls.component.css' ],
  providers: []
})
export class SelectorThemeComponent implements AfterViewInit {

  public availableThemes: Array<SelectableItem>;

  constructor(private metadataLoader: ControlsService,
              private themesEventService: ThemesEventService) {
    this.availableThemes = new Array<SelectableItem>();
  }

  private initAvailableThemes(): void {
    this.metadataLoader.getAvailableThemes().subscribe(
      (metadata: SectionMetadata) => {
        this.availableThemes = metadata.items.map(item => {
          return SelectableItem.from(item);
        });
        if (this.availableThemes && this.availableThemes.length > 0) {
          this.fireThemeChangedEvent(this.availableThemes[0].code);
        } else {
          throw new Error('Unexpected state: no themes registered as available!');
        }
      },
      (error: any) => console.error(`Failed to load themes metadata: ${error}`)
    );
  }

  public fireThemeChangedEvent(themeCode: string): void {
    this.themesEventService.loadThemeRequested(themeCode);
  }

  public ngAfterViewInit(): void {
    this.initAvailableThemes();
  }

}
