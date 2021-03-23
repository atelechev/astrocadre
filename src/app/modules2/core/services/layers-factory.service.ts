import { Injectable } from '@angular/core';
import { Layer } from 'src/app/modules2/core/models/layer';
import { AxialCurvesFactory } from 'src/app/modules2/core/models/layers/factories/axial-curves-factory';
import { ConstellationBoundariesLayerFactory } from 'src/app/modules2/core/models/layers/factories/constellation-boundaries-layer-factory';
import { ConstellationLinesLayerFactory } from 'src/app/modules2/core/models/layers/factories/constellation-lines-layer-factory';
import { ConstellationNamesLayerFactory } from 'src/app/modules2/core/models/layers/factories/constellation-names-layer-factory';
import { LayerFactory } from 'src/app/modules2/core/models/layers/factories/layer-factory';
import { PointsFactory } from 'src/app/modules2/core/models/layers/factories/points-factory';
import { SkyGridLayerFactory } from 'src/app/modules2/core/models/layers/factories/sky-grid-layer-factory';
import { StarsLayerFactory } from 'src/app/modules2/core/models/layers/factories/stars-layer-factory';
import { RenderableLayer } from 'src/app/modules2/core/models/layers/renderable-layer';
import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';


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
    const useCode = this.calculateTargetLayerCode(layer.code);
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
    const isStarsMagnitudeLayer = fromCode.startsWith(StarsLayerFactory.STARS_LAYER_CODE_PREFIX);
    return isStarsMagnitudeLayer ? SupportedLayers.STARS : fromCode;
  }

}