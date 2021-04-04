import { Component, Input } from '@angular/core';
import { Layer } from '#core/models/layer';
import { SupportedLayers } from '#core/models/supported-layers';
import { LayersVisibilityManagerService } from '#core/services/layers-visibility-manager.service';


@Component({
  selector: 'ac-controls-select-layer',
  templateUrl: './selector-layer.component.html'
})
export class SelectorLayerComponent {

  private _layer: Layer;

  constructor(private readonly _visibilityManager: LayersVisibilityManagerService) {

  }

  @Input()
  public set layer(l: Layer) {
    this._layer = l;
  }

  public get layer(): Layer {
    return this._layer;
  }

  public get isShown(): boolean {
    return this._visibilityManager.isShown(this._layer.code);
  }

  public set isShown(show: boolean) {
    if (show) {
      this._visibilityManager.showLayer(this._layer.code);
    } else {
      this._visibilityManager.hideLayer(this._layer.code);
    }
  }

  public get subLayers(): Array<Layer> {
    return this._layer?.subLayers || [];
  }

  public get isStarsLayer(): boolean {
    return this._layer?.code === SupportedLayers.STARS;
  }

}
