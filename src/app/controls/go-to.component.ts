import { Component } from '@angular/core';
import { ViewportEventService } from '../core/viewport/viewport-event.service';
import { SearchService } from '../core/search/search.service';

@Component({
  selector: `app-sky-view-controls-go-to`,
  templateUrl: './go-to.component.html',
  styleUrls: [ './controls.component.css', './go-to.component.css' ],
  providers: []
})
export class GoToComponent {

  private searchText: string;

  private searchNoResultsClass: string;

  private goToButtonDisabled: boolean;

  constructor(private viewportEventService: ViewportEventService,
              private searchService: SearchService) {
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
    const goToCoord = this.searchService.search(this.searchText);
    if (goToCoord) {
      this.resetSearchInputCssClass();
      this.viewportEventService.centerViewRequested(goToCoord);
    } else {
      this.searchNoResultsClass = 'searchtext-input-invalid';
    }
  }

  private resetSearchInputCssClass(): void {
    this.searchNoResultsClass = '';
  }

}
