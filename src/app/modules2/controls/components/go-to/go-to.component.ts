import { Component } from '@angular/core';
import { CameraService } from 'src/app/modules2/core/services/camera.service';
import { SearchService } from 'src/app/modules2/core/services/search.service';


@Component({
  selector: 'ac-controls-go-to',
  templateUrl: './go-to.component.html',
  styleUrls: [
    '../controls-common.css',
    './go-to.component.css'
  ]
})
export class GoToComponent {

  private _searchText: string;

  private _hasSearchResults: boolean;

  constructor(
    private readonly _searchService: SearchService,
    private readonly _cameraService: CameraService
  ) {
    this._hasSearchResults = true; // do not show error highlight when no search was made yet
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
    return this._hasSearchResults ? '' : 'ac-searchtext-input-invalid';
  }

  public execSearchRequest(): void {
    const goToCoord = this._searchService.search(this.searchText);
    this._hasSearchResults = !!goToCoord;
    if (goToCoord) {
      this._cameraService.centerView(goToCoord);
    }
  }

}
