import { Component, AfterViewInit } from '@angular/core';
import { SearchableItem } from './searchable-item';
import { ControlsService } from './controls.service';
import { ViewportEventService } from '../core/viewport/viewport-event.service';
import { SkyCoordinate } from '../core/viewport/sky-coordinate';

@Component({
  selector: `app-sky-view-controls-go-to`,
  templateUrl: './go-to.component.html',
  styleUrls: [ './controls.component.css', './go-to.component.css' ],
  providers: []
})
export class GoToComponent implements AfterViewInit {

  private readonly coordinates = /(\d+(?:[.,]\d*)?)\s+(-?\d+(?:[.,]\d*)?)/i;

  private searchText: string;

  private searchNoResultsClass: string;

  private goToButtonDisabled: boolean;

  private searchableItems: Map<string, SearchableItem>;

  constructor(private metadataService: ControlsService,
              private viewportEventService: ViewportEventService) {
    this.goToButtonDisabled = true;
  }

  public updateGoToButtonState(): void {
    this.goToButtonDisabled = !this.searchText || this.searchText.trim().length < 1;
    this.resetSearchInputCssClass();
  }

  public execGoToSearchRequest(): void {
    if (this.goToButtonDisabled) {
      return;
    }
    const goToCoord = this.parseSearchText();
    if (goToCoord) {
      this.resetSearchInputCssClass();
      this.viewportEventService.centerViewRequested(goToCoord);
    } else {
      this.searchNoResultsClass = 'searchtext-input-invalid';
    }
  }

  private parseSearchText(): SkyCoordinate {
    const directCoordinates = this.searchTextToCoordinate();
    if (directCoordinates) {
      return directCoordinates;
    }
    const searchTextNormalized = this.normalizeString(this.searchText);
    if (this.searchableItems.has(searchTextNormalized)) {
      const item = this.searchableItems.get(searchTextNormalized);
      return this.toSkyCoordinate(item.ra, item.dec);
    }
    return undefined;
  }

  private toSkyCoordinate(ra: number, dec: number): SkyCoordinate {
    return { rightAscension: ra, declination: dec };
  }

  private searchTextToCoordinate(): SkyCoordinate {
    const matches = this.searchText.match(this.coordinates);
    if (matches && matches.length === 3) {
      return this.toSkyCoordinate(parseFloat(matches[0]), parseFloat(matches[1]));
    }
    return undefined;
  }

  private normalizeString(value: string): string {
    const replaceExpr = /\s+/gi;
    return value.replace(replaceExpr, '').toUpperCase();
  }

  private resetSearchInputCssClass(): void {
    this.searchNoResultsClass = '';
  }

  private initSearchableItemsMap(items: SearchableItem[]): void {
    this.searchableItems = new Map<string, SearchableItem>();
    items.forEach(item => {
        this.searchableItems.set(this.normalizeString(item.code), item);
        if (item.names) {
          item.names.forEach(name => this.searchableItems.set(this.normalizeString(name), item));
        }
      }
    );
  }

  public ngAfterViewInit(): void {
    this.metadataService.getSearchableItems().subscribe(
      (items: SearchableItem[]) => this.initSearchableItemsMap(items),
      (error: any) => console.log(`Failed to retrieve searchable items: ${error}`)
    );
  }

}
