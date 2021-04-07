import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { Layer } from '#core/models/layers/layer';

/**
 * Provides the access to the layer factory associated with the implementor.
 */
export interface LayerFactoryAware {

  /**
   * Returns an instance of the layer factory able to build
   * a renderable layer for the specified model.
   *
   * @param model the model of the layer to get a factory for.
   */
  getLayerFactory(model: Layer): LayerFactory;

}
