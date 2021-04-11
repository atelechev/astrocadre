import { Component } from '@angular/core';
import { StarsVisibilityManagerService } from '#layer-stars/services/visibility/stars-visibility-manager.service';

/**
 * Provides the UI with the controls allowing to select
 * the magnitude of the stars shown in the viewport.
 */
@Component({
  selector: 'ac-controls-select-star-magnitude',
  templateUrl: './selector-star-magnitude.component.html'
})
export class SelectorStarMagnitudeComponent {

  private _shownMagnitudeDownTo: number;

  constructor(
    private readonly _starsVisibilityManager: StarsVisibilityManagerService
  ) {
    this._shownMagnitudeDownTo = 6;
  }

  public get shownMagnitudeDownTo(): number {
    return this._shownMagnitudeDownTo;
  }

  public set shownMagnitudeDownTo(mg: number) {
    if (mg && mg !== this._shownMagnitudeDownTo) {
      this._shownMagnitudeDownTo = mg;
      this._starsVisibilityManager.showStarLayersDownToMagnitude(this._shownMagnitudeDownTo);
    }
  }

}
