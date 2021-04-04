import { Component } from '@angular/core';
import { SupportedLayers } from '#core/models/layers/supported-layers';
import { NameSelectionType } from '#controls/models/name-selection-type';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { StarsVisibilityManagerService } from '#core/services/visibility/stars-visibility-manager.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';

@Component({
  selector: 'ac-controls-select-star-names',
  templateUrl: './selector-star-names.component.html'
})
export class SelectorStarNamesComponent {

  private readonly _starsLayerCode = SupportedLayers.STARS;

  private readonly _selectableNames: Array<NameSelectionType>;

  private _shownNames: number;

  constructor(
    private readonly _layersVisibilityManager: LayersVisibilityManagerService,
    private readonly _starsVisibilityManager: StarsVisibilityManagerService,
    private readonly _textsVisibilityManager: TextsVisibilityManagerService
  ) {
    this._selectableNames = this.buildSelectionsList();
    this._shownNames = this._selectableNames[1].value;
  }

  public get selectableNames(): Array<NameSelectionType> {
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

  public get isDisabled(): boolean {
    return !this._layersVisibilityManager.isShown(this._starsLayerCode);
  }

  private updateShownNames(): void {
    this._textsVisibilityManager.hideTexts(this._starsLayerCode);
    if (this._shownNames > 0) {
      const showProperNames = this._shownNames === 1;
      this._starsVisibilityManager.showStarsProperNames(showProperNames);
      this._textsVisibilityManager.showTexts(this._starsLayerCode);
    }
  }

  private buildSelectionsList(): Array<NameSelectionType> {
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
