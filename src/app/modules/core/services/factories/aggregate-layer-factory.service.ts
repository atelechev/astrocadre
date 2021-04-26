import { Injectable } from '@angular/core';
import { AggregateLayer } from '#core/models/layers/aggregate-layer';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { Layer } from '#core/models/layers/layer';

/**
 * Factory object for AggregateLayer instances.
 *
 */
@Injectable()
export class AggregateLayerFactoryService implements LayerFactory {

  public buildRenderableLayer(model: Layer): AggregateLayer {
    if (model) {
      return new AggregateLayer(model);
    }
    return undefined;
  }

}
