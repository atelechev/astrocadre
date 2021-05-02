import { Injectable } from '@angular/core';
import { Stars } from '#layer-stars/models/stars';
import { LayerService } from '#core/services/layer.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { AggregateLayer } from '#core/models/layers/aggregate-layer';

/**
 * Provides methods to manage the visibility of the layers of stars of different magnitudes.
 */
@Injectable()
export class StarsVisibilityManagerService {

  private readonly _layerCode: string;

  constructor(
    private readonly _layerService: LayerService,
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
        const visible = !(magnitude < layer.magnitudeClass);
        this._layerService.setVisible(layer.code, visible);
      }
    );
  }

  /**
   * Sets the showing of proper or standard names of the stars.
   *
   * @param show true to show the proper names, false for the standard names.
   */
  public showStarsProperNames(show: boolean): void {
    const visibleStarsLayers = this.getVisibleStarsLayers();
    this._textsVisibilityManager.setTextsVisible(this._layerCode, false);
    visibleStarsLayers.forEach(
      (layer: Stars) => this.toggleNamesType(layer, show)
    );
    this._textsVisibilityManager.setTextsVisible(this._layerCode, true);
  }

  private get starsLayer(): AggregateLayer {
    return this._layerService.getRenderableLayer(this._layerCode) as AggregateLayer;
  }

  private getAllStarsLayers(): Array<Stars> {
    return this.starsLayer.subLayers.map(
      (subLayer: string) => this._layerService.getRenderableLayer(subLayer) as Stars
    ).filter((starLayer: Stars) => !!starLayer) || [];
  }

  private getVisibleStarsLayers(): Array<Stars> {
    return this.starsLayer.subLayers
      .filter(
        (code: string) => this._layerService.isShown(code)
      ).map(
        (code: string) => this._layerService.getRenderableLayer(code) as Stars
      );
  }

  private toggleNamesType(layer: Stars, useProper: boolean): void {
    if (useProper) {
      layer.showProperNames();
    } else {
      layer.showStandardNames();
    }
  }

}
