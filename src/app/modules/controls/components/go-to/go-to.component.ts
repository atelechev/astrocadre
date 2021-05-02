import { Component } from '@angular/core';
import { CameraService } from '#core/services/camera.service';
import { SearchService } from '#core/services/search.service';

/**
 * Provides the UI for the "go to" functionality: a text input and a
 * button, which allow to navigate directly to the objects that match
 * the text in the input.
 */
@Component({
  selector: 'ac-controls-go-to',
  templateUrl: './go-to.component.html'
})
export class GoToComponent {

  private _searchText: string;

  private _hasSearchResults: boolean;

  constructor(
    private readonly _searchService: SearchService,
    private readonly _cameraService: CameraService
  ) {
    this._hasSearchResults = true; // do not show error highlight when no search was made yet
    this.subscribeSearchReady();
  }

  public get isDisabled(): boolean {
    return !this.searchText || this.searchText.trim().length < 1;
  }

  public get searchText(): string {
    return this._searchText;
  }

  public set searchText(st: string) {
    this._searchText = st;
  }

  public get searchNoResultsCssClass(): string {
    return this._hasSearchResults ? '' : 'ng-invalid';
  }

  public execSearchRequest(): void {
    const goToCoord = this._searchService.search(this.searchText);
    this._hasSearchResults = !!goToCoord;
    if (goToCoord) {
      this._cameraService.centerView(goToCoord);
    }
  }

  private subscribeSearchReady(): void {
    this._searchService
      .searchReady
      .subscribe(
        (ready: boolean) => {
          if (ready) {
            this._searchText = this._searchService.getRandomLocationName();
            this.execSearchRequest();
          }
        }
      );
  }

}
