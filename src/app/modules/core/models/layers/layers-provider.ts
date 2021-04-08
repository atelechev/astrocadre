import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';

/**
 * Provides methods to access renderable layers and related objects.
 */
export interface LayersProvider {

  /**
   * Returns the renderable layer corresponding to the specified model.
   *
   * @param model the model to return the renderable layer for.
   */
  getRenderableLayer(model: Layer): RenderableLayer;

}
