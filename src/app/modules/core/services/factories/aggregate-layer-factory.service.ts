import { Injectable } from '@angular/core';
import { AggregateLayer } from '#core/models/layers/aggregate-layer';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { Layer } from '#core/models/layers/layer';

// TODO remove it
/**
 * Factory object for AggregateLayer instances.
 */
@Injectable()
export class AggregateLayerFactoryService implements LayerFactory {

  public buildRenderableLayer(model: Layer): AggregateLayer {
    return new AggregateLayer(model);
  }

}
