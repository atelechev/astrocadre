import { Component } from '@angular/core';
import { NameSelectionType } from 'src/app/modules2/controls/components/selector-star-names/name-selection-type';
import { Stars } from 'src/app/modules2/core/models/layers/stars';
import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { LayerService } from 'src/app/modules2/core/services/layer.service';

@Component({
  selector: 'ac-controls-select-star-names',
  templateUrl: './selector-star-names.component.html'
})
export class SelectorStarNamesComponent {

  private readonly _selectableNames: Array<NameSelectionType>;

  private _shownNames: number;

  constructor(
    private readonly _layerService: LayerService
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
    if (sn > -1 && sn !== this._shownNames) {
      this._shownNames = sn;
      this.updateShownNames();
    }
  }

  public get isDisabled(): boolean {
    return !this._layerService.isShown(SupportedLayers.STARS);
  }

  private updateShownNames(): void {
    this._layerService.hideTexts(this.starsLayer);
    if (this._shownNames > 0) {
      const showProperNames = this._shownNames === 1;
      this._layerService.showStarsProperNames(showProperNames);
      this._layerService.showTexts(this.starsLayer);
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

  private get starsLayer(): Stars {
    return this._layerService.getRenderableLayer(SupportedLayers.STARS) as Stars;
  }

}
