import { Component } from '@angular/core';
import { Stars } from 'src/app/modules2/core/models/layers/stars';
import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { LayerService } from 'src/app/modules2/core/services/layer.service';

@Component({
  selector: 'ac-controls-select-star-names',
  templateUrl: './selector-star-names.component.html'
})
export class SelectorStarNamesComponent {

  private _showNamesLevel: number; // 0=none, 1=proper, 2=standard

  constructor(
    private readonly _layerService: LayerService
  ) {
    this._showNamesLevel = 1;
  }

  public get showNamesLevel(): number {
    return this._showNamesLevel;
  }

  public set showNamesLevel(level: number) {
    this._showNamesLevel = level;
  }

  public get title(): string {
    switch (this._showNamesLevel) {
      case 0: return 'Do not show star names';
      case 1: return 'Proper names: Vega, Sirius, Regel...';
      case 2: return 'Standard/Bayer names: Alpha, Beta, Gamma...';
      default: throw new Error(`Unexpected names level: ${this._showNamesLevel}`);
    }
  }

  public updateShownNames(): void {
    this._layerService.hideTexts(this.starsLayer);
    if (this._showNamesLevel > 0) {
      const showProperNames = this._showNamesLevel === 1;
      this._layerService.showStarsProperNames(showProperNames);
      this._layerService.showTexts(this.starsLayer);
    }
  }

  public get namesLabel(): string {
    switch (this._showNamesLevel) {
      case 0: return 'No names';
      case 1: return 'Proper names';
      case 2: return 'Standard names';
      default: throw new Error(`Unexpected names level: ${this._showNamesLevel}`);
    }
  }

  private get starsLayer(): Stars {
    return this._layerService.getRenderableLayer(SupportedLayers.STARS) as Stars;
  }

  public get isDisabled(): boolean {
    return !this._layerService.isShown(SupportedLayers.STARS);
  }

}
