import { Injectable } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { ConstellationBoundariesLayerFactory } from '#layer-constellations/models/constellation-boundaries-layer-factory';
import { ConstellationLinesLayerFactory } from '#layer-constellations/models/constellation-lines-layer-factory';
import { ConstellationNamesLayerFactory } from '#layer-constellations/models/constellation-names-layer-factory';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { PointsFactory } from '#core/models/layers/factories/points-factory';
import { SkyGridLayerFactory } from '#layer-sky-grid/models/sky-grid-layer-factory';
import { StarsLayerFactory } from '#layer-stars/models/stars-layer-factory';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { SupportedLayers } from '#core/models/layers/supported-layers';
import { SearchService } from '#core/services/search.service';

/**
 * Provides a method to build layers of objects to show.
 */
@Injectable()
export class LayersFactoryService {

  private readonly _curvesFactory: AxialCurvesFactory;

  private readonly _pointsFactory: PointsFactory;

  constructor(private readonly _searchService: SearchService) {
    this._curvesFactory = new AxialCurvesFactory();
    this._pointsFactory = new PointsFactory();
  }

  /**
   * Builds and returns a renderable layer corresponding to the specified model.
   *
   * @param layer the model object to build a renderable for.
   * @returns RenderableLayer the renderable object.
   */
  public buildRenderableLayer(layer: Layer): RenderableLayer {
    const factory = this.getLayerFactory(layer);
    const renderable = factory?.buildRenderableLayer();
    this._searchService.registerSearchables(renderable?.searchables);
    return renderable;
  }

  private getLayerFactory(layer: Layer): LayerFactory {
    const useCode = this.calculateTargetLayerCode(layer?.code);
    switch (useCode) {
      case SupportedLayers.SKY_GRID:
        return new SkyGridLayerFactory(layer, this._curvesFactory); // TODO remove when loaded dynamically
      case SupportedLayers.CONSTELLATION_BOUNDARIES:
        return new ConstellationBoundariesLayerFactory(layer, this._curvesFactory);
      case SupportedLayers.CONSTELLATION_LINES:
        return new ConstellationLinesLayerFactory(layer, this._curvesFactory);
      case SupportedLayers.CONSTELLATION_NAMES:
        return new ConstellationNamesLayerFactory(layer);
      case SupportedLayers.STARS:
        return new StarsLayerFactory(layer, this._pointsFactory);
      default: return undefined;
    }
  }

  private calculateTargetLayerCode(fromCode: string): string {
    if (!fromCode) {
      return undefined;
    }
    // return the parent 'stars' identifier for all the sub-layers of stars.
    const isStarsMagnitudeLayer = fromCode.startsWith(StarsLayerFactory.STARS_LAYER_CODE_PREFIX);
    return isStarsMagnitudeLayer ? SupportedLayers.STARS : fromCode;
  }

}
