import { Component } from '@angular/core';
import { SupportedLayers } from 'src/app/modules/core/models/supported-layers';
import { LayerService } from 'src/app/modules/core/services/layer.service';


@Component({
  selector: 'ac-controls-select-star-magnitude',
  templateUrl: './selector-star-magnitude.component.html'
})
export class SelectorStarMagnitudeComponent {

  private _shownMagnitudeDownTo: number;

  constructor(private readonly _layerService: LayerService) {
    this._shownMagnitudeDownTo = 6;
  }

  public get isDisabled(): boolean {
    return !this._layerService.isShown(SupportedLayers.STARS);
  }

  public get shownMagnitudeDownTo(): number {
    return this._shownMagnitudeDownTo;
  }

  public set shownMagnitudeDownTo(mg: number) {
    if (mg && mg !== this._shownMagnitudeDownTo) {
      this._shownMagnitudeDownTo = mg;
      this._layerService.showStarLayersDownToMagnitude(this._shownMagnitudeDownTo);
    }
  }

}
