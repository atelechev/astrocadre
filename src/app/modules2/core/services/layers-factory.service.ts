import { Injectable } from '@angular/core';
import { Layer } from 'src/app/modules2/core/models/layer';
import { LayerFactory } from 'src/app/modules2/core/models/layers/factories/layer-factory';
import { SkyGridLayerFactory } from 'src/app/modules2/core/models/layers/factories/sky-grid-layer-factory';
import { RenderableLayer } from 'src/app/modules2/core/models/layers/renderable-layer';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';


@Injectable()
export class LayersFactoryService {

  constructor(
    private readonly _materialsService: MaterialsService,
    private readonly _eventsService: EventsService
  ) {

  }

  public buildRenderableLayer(layer: Layer): RenderableLayer {
    const factory = this.getLayerFactory(layer);
    return factory?.buildRenderableLayer(); // FIXME '?.'
  }

  private getLayerFactory(layer: Layer): LayerFactory {
    switch (layer.code) {
      case 'sky-grid': return new SkyGridLayerFactory(layer, this._materialsService, this._eventsService);
      // default: throw new Error(`Unsupported layer: ${layer.code}`); // FIXME enable
      default: return undefined;
    }
  }

}
