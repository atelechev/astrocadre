import { AggregateLayer } from '#core/models/layers/aggregate-layer';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { Layer } from '#core/models/layers/layer';

/**
 * Factory object for AggregateLayer instances.
 */
export class AggregateLayerFactory implements LayerFactory {

  public buildRenderableLayer(model: Layer): AggregateLayer {
    return new AggregateLayer(model);
  }

}
