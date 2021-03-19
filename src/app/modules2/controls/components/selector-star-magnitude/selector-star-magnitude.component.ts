import { Component } from '@angular/core';
import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { LayerService } from 'src/app/modules2/core/services/layer.service';


@Component({
  selector: 'ac-controls-select-star-magnitude',
  templateUrl: './selector-star-magnitude.component.html',
  styleUrls: [
    './selector-star-magnitude.component.css'
  ]
})
export class SelectorStarMagnitudeComponent {

  constructor(private readonly _layerService: LayerService) {

  }

  public get isDisabled(): boolean {
    return !this._layerService.isShown(SupportedLayers.STARS);
  }

  public get initialMagnitude(): number {
    return 6;
  }

  public showMagnitudesDownTo(mg: number) {
    this._layerService.showStarLayersDownToMagnitude(mg);
  }

}
