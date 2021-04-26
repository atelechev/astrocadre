import { Component } from '@angular/core';
import { StarsVisibilityManagerService } from '#layer-stars/services/visibility/stars-visibility-manager.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { SelectableItem } from '#core/models/selectable-item';
import { Stars } from '#layer-stars/models/stars';

/**
 * Provides the UI with the controls allowing to select
 * which type of star names should be shown in the viewport.
 */
@Component({
  selector: 'ac-controls-select-star-names',
  templateUrl: './selector-star-names.component.html'
})
export class SelectorStarNamesComponent {

  private readonly _layerCode: string;

  private readonly _selectableNames: Array<SelectableItem>;

  private _shownNames: number;

  constructor(
    private readonly _starsVisibilityManager: StarsVisibilityManagerService,
    private readonly _textsVisibilityManager: TextsVisibilityManagerService
  ) {
    this._layerCode = Stars.CODE;
    this._selectableNames = this.buildSelectionsList();
    this._shownNames = this._selectableNames[1].value;
  }

  public get selectableNames(): Array<SelectableItem> {
    return this._selectableNames;
  }

  public get shownNames(): number {
    return this._shownNames;
  }

  public set shownNames(sn: number) {
    const canUpdate = sn > -1 &&
      sn < this._selectableNames.length
      && sn !== this._shownNames;
    if (canUpdate) {
      this._shownNames = sn;
      this.updateShownNames();
    }
  }

  private updateShownNames(): void {
    this._textsVisibilityManager.setTextsVisible(this._layerCode, false);
    if (this._shownNames > 0) {
      const showProperNames = this._shownNames === 1;
      this._starsVisibilityManager.showStarsProperNames(showProperNames);
      this._textsVisibilityManager.setTextsVisible(this._layerCode, true);
    }
  }

  private buildSelectionsList(): Array<SelectableItem> {
    return [
      {
        label: 'None',
        value: 0
      },
      {
        label: 'Proper',
        value: 1
      },
      {
        label: 'Standard',
        value: 2
      }];
  }

}
