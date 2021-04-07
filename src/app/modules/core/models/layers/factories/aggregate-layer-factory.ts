import { AggregateLayer } from '#core/models/layers/aggregate-layer';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { Layer } from '#core/models/layers/layer';

/**
 * Factory object for AggregateLayer instances.
 */
export class AggregateLayerFactory implements LayerFactory {

  constructor(private readonly _layerModel: Layer) {

  }

  public buildRenderableLayer(): AggregateLayer {
    return new AggregateLayer(this._layerModel);
  }

}
