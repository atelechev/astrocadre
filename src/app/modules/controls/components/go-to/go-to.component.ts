import { Component } from '@angular/core';
import { SearchService } from '#core/services/search.service';
import { ViewportEventService } from '#core/services/viewport-event.service';

@Component({
  selector: `ac-controls-go-to`,
  templateUrl: './go-to.component.html'
})
export class GoToComponent {

  public searchText: string;

  public searchNoResultsClass: string;

  public goToButtonDisabled: boolean;

  constructor(private viewportEventService: ViewportEventService,
    private searchService: SearchService) {
    this.goToButtonDisabled = true;
    this.subscribeGotoInitialPosition();
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

  private subscribeGotoInitialPosition(): void {
    this.searchService.broadcastItemsLoaded$.subscribe(
      () => {
        const gotoQueryParam = this.getInitialPositionFromUrlQueryParam();
        this.goto(gotoQueryParam ? gotoQueryParam : 'Orion');
      }
    );
  }

  private goto(position: string): void {
    if (position) {
      this.searchText = position;
      this.goToButtonDisabled = false;
      this.execGoToSearchRequest();
    }
  }

  private resetSearchInputCssClass(): void {
    this.searchNoResultsClass = '';
  }

  private getInitialPositionFromUrlQueryParam(): string {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    return searchParams.get('goto');
  }

}
