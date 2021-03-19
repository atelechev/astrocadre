import { Component } from '@angular/core';
import { Stars } from 'src/app/modules2/core/models/layers/stars';
import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { LayerService } from 'src/app/modules2/core/services/layer.service';

@Component({
  selector: 'ac-controls-select-star-names',
  templateUrl: './selector-star-names.component.html',
  styleUrls: [
    './selector-star-names.component.css'
  ]
})
export class SelectorStarNamesComponent {

  constructor(
    private readonly _layerService: LayerService
  ) {

  }

  private get starsLayer(): Stars {
    return this._layerService.getRenderableLayer(SupportedLayers.STARS) as Stars;
  }

  public get isDisabled(): boolean {
    return !this._layerService.isShown(SupportedLayers.STARS);
  }

  public get namesShown(): boolean {
    return this.starsLayer.areTextsShown;
  }

  public set namesShown(shown: boolean) {
    if (shown) {
      this._layerService.showTexts(this.starsLayer);
    } else {
      this._layerService.hideTexts(this.starsLayer);
    }
  }

  public get useProperNames(): boolean {
    return this.starsLayer.properNamesShown;
  }

  public set useProperNames(show: boolean) {
    this._layerService.showStarsProperNames(show);
  }

}
