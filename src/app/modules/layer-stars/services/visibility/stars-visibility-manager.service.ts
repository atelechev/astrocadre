import { Injectable } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { Stars } from '#layer-stars/models/stars';
import { LayerService } from '#core/services/layer.service';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';

/**
 * Provides methods to manage the visibility of the layers of stars of different magnitudes.
 */
@Injectable()
export class StarsVisibilityManagerService {

  private readonly _layerCode: string;

  constructor(
    private readonly _layerService: LayerService,
    private readonly _layersVisibilityManager: LayersVisibilityManagerService,
    private readonly _textsVisibilityManager: TextsVisibilityManagerService
  ) {
    this._layerCode = Stars.CODE;
  }

  /**
   * Shows all the stars of magnitude lower or equal to the specified.
   *
   * @param magnitude the magnitude value to show the stars for.
   */
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

  /**
   * Sets the showing of proper or standard names of the stars.
   *
   * @param show true to show the proper names, false for the standard names.
   */
  public showStarsProperNames(show: boolean): void {
    this._textsVisibilityManager.hideTexts(this._layerCode);
    this.toggleNamesType(this.starsLayer, show);
    this._textsVisibilityManager.showTexts(this._layerCode);
  }

  private get starsLayer(): Stars {
    return this._layerService.getRenderableLayer(this._layerCode) as Stars;
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
