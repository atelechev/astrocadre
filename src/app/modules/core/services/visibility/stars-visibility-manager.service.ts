import { Injectable } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { Stars } from '#core/models/layers/stars';
import { SupportedLayers } from '#core/models/layers/supported-layers';
import { LayerService } from '#core/services/layer.service';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';


@Injectable()
export class StarsVisibilityManagerService {

  private readonly _starsLayerCode = SupportedLayers.STARS;

  constructor(
    private readonly _layerService: LayerService,
    private readonly _layersVisibilityManager: LayersVisibilityManagerService,
    private readonly _textsVisibilityManager: TextsVisibilityManagerService
  ) {
    // nothing
  }

  public showStarLayersDownToMagnitude(magnitude: number): void {
    this.getAllStarsLayers().forEach(
      (layer: Stars) => {
        if (magnitude < layer.magnitudeClass) {
          this._layersVisibilityManager.hideLayer(layer.code);
        } else {
          this._layersVisibilityManager.showLayer(layer.code);
        }
      }
    );
  }

  public showStarsProperNames(show: boolean): void {
    this._textsVisibilityManager.hideTexts(this._starsLayerCode);
    this.toggleNamesType(this.starsLayer, show);
    this._textsVisibilityManager.showTexts(this._starsLayerCode);
  }

  private get starsLayer(): Stars {
    return this._layerService.getRenderableLayer(this._starsLayerCode) as Stars;
  }

  private getAllStarsLayers(): Array<Stars> {
    return this.starsLayer?.subLayers?.map(
      (subLayer: Layer) => this._layerService.getRenderableLayer(subLayer.code) as Stars
    ).filter((starLayer: Stars) => !!starLayer) || [];
  }

  private toggleNamesType(layer: Stars, useProper: boolean): void {
    if (!layer) {
      return;
    }
    if (useProper) {
      layer.showProperNames();
    } else {
      layer.showStandardNames();
    }
    layer.subLayers?.forEach(
      (subLayer: Layer) => {
        const starsSublayer = this._layerService.getRenderableLayer(subLayer.code) as Stars;
        this.toggleNamesType(starsSublayer, useProper);
      }
    );
  }

}
