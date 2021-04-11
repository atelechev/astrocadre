import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';

/**
 * Provides a method allowing to build a RenderableLayer.
 */
export interface LayerFactory {

  /**
   * Creates and returns a new renderable layer.
   *
   * @param model the model of the layer to build.
   * @returns RenderableLayer a new layer instance.
   */
  buildRenderableLayer(model: Layer): RenderableLayer;

}
