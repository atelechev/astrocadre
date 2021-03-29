import { Injectable } from '@angular/core';
import { Layer } from '#core/models/layer';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { ConstellationBoundariesLayerFactory } from '#core/models/layers/factories/constellation-boundaries-layer-factory';
import { ConstellationLinesLayerFactory } from '#core/models/layers/factories/constellation-lines-layer-factory';
import { ConstellationNamesLayerFactory } from '#core/models/layers/factories/constellation-names-layer-factory';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { PointsFactory } from '#core/models/layers/factories/points-factory';
import { SkyGridLayerFactory } from '#core/models/layers/factories/sky-grid-layer-factory';
import { StarsLayerFactory } from '#core/models/layers/factories/stars-layer-factory';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { SupportedLayers } from '#core/models/supported-layers';
import { EventsService } from '#core/services/events.service';
import { MaterialsService } from '#core/services/materials.service';


@Injectable()
export class LayersFactoryService {

  private readonly _curvesFactory: AxialCurvesFactory;

  private readonly _pointsFactory: PointsFactory;

  constructor(
    private readonly _materialsService: MaterialsService,
    private readonly _eventsService: EventsService
  ) {
    this._curvesFactory = new AxialCurvesFactory();
    this._pointsFactory = new PointsFactory();
  }

  public buildRenderableLayer(layer: Layer): RenderableLayer {
    const factory = this.getLayerFactory(layer);
    return factory?.buildRenderableLayer();
  }

  private getLayerFactory(layer: Layer): LayerFactory {
    const useCode = this.calculateTargetLayerCode(layer?.code);
    switch (useCode) {
      case SupportedLayers.SKY_GRID:
        return new SkyGridLayerFactory(
          layer,
          this._materialsService,
          this._eventsService,
          this._curvesFactory
        );
      case SupportedLayers.CONSTELLATION_BOUNDARIES:
        return new ConstellationBoundariesLayerFactory(
          layer,
          this._materialsService,
          this._eventsService,
          this._curvesFactory
        );
      case SupportedLayers.CONSTELLATION_LINES:
        return new ConstellationLinesLayerFactory(
          layer,
          this._materialsService,
          this._eventsService,
          this._curvesFactory
        );
      case SupportedLayers.CONSTELLATION_NAMES: {
        return new ConstellationNamesLayerFactory(
          layer,
          this._materialsService,
          this._eventsService
        );
      };
      case SupportedLayers.STARS: {
        return new StarsLayerFactory(
          layer,
          this._materialsService,
          this._eventsService,
          this._pointsFactory
        );
      }
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