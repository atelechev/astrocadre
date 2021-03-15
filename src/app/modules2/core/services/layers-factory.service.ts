import { Injectable } from '@angular/core';
import { Layer } from 'src/app/modules2/core/models/layer';
import { AxialCurvesFactory } from 'src/app/modules2/core/models/layers/factories/axial-curves-factory';
import { ConstellationBoundariesLayerFactory } from 'src/app/modules2/core/models/layers/factories/constellation-boundaries-layer-factory';
import { ConstellationLinesLayerFactory } from 'src/app/modules2/core/models/layers/factories/constellation-lines-layer-factory';
import { ConstellationNamesLayerFactory } from 'src/app/modules2/core/models/layers/factories/constellation-names-layer-factory';
import { LayerFactory } from 'src/app/modules2/core/models/layers/factories/layer-factory';
import { SkyGridLayerFactory } from 'src/app/modules2/core/models/layers/factories/sky-grid-layer-factory';
import { RenderableLayer } from 'src/app/modules2/core/models/layers/renderable-layer';
import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';


@Injectable()
export class LayersFactoryService {

  private readonly _curvesFactory: AxialCurvesFactory;

  constructor(
    private readonly _materialsService: MaterialsService,
    private readonly _eventsService: EventsService
  ) {
    this._curvesFactory = new AxialCurvesFactory();
  }

  public buildRenderableLayer(layer: Layer): RenderableLayer {
    const factory = this.getLayerFactory(layer);
    return factory?.buildRenderableLayer(); // FIXME '?.'
  }

  private getLayerFactory(layer: Layer): LayerFactory {
    switch (layer.code) {
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
      }
      // default: throw new Error(`Unsupported layer: ${layer.code}`); // FIXME enable
      default: return undefined;
    }
  }

}
