import { Component, AfterViewInit } from '@angular/core';
import { SearchableItem } from './searchable-item';
import { ControlsService } from './controls.service';
import { ViewportEventService } from '../viewport/viewport-event.service';

@Component({
  selector: `app-sky-view-controls-go-to`,
  templateUrl: './go-to.component.html',
  styleUrls: [ './controls.component.css', './go-to.component.css' ],
  providers: []
})
export class GoToComponent implements AfterViewInit {

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
    const searchTextNormalized = this.searchText.trim().toUpperCase();
    if (this.searchableItems.has(searchTextNormalized)) {
      const item = this.searchableItems.get(searchTextNormalized);
      const goToCoord = { rightAscension: item.ra, declination: item.dec };
      this.resetSearchInputCssClass();
      this.viewportEventService.centerViewRequested(goToCoord);
    } else {
      this.searchNoResultsClass = 'searchtext-input-invalid';
    }
  }

  private resetSearchInputCssClass(): void {
    this.searchNoResultsClass = '';
  }

  private initSearchableItemsMap(items: SearchableItem[]): void {
    this.searchableItems = new Map<string, SearchableItem>();
    items.forEach(item =>
      this.searchableItems.set(item.code.trim().toUpperCase(), item)
    );
  }

  public ngAfterViewInit(): void {
    this.metadataService.getSearchableItems().subscribe(
      (items: SearchableItem[]) => this.initSearchableItemsMap(items),
      (error: any) => console.log(`Failed to retrieve searchable items: ${error}`)
    );
  }

}
