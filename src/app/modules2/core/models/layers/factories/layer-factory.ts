import { RenderableLayer } from 'src/app/modules2/core/models/layers/renderable-layer';

/**
 * Provides a method allowing to initialize a RenderableLayer.
 */
export interface LayerFactory {

  /**
   * Creates and returns a new renderable layer.
   */
  buildRenderableLayer(): RenderableLayer;

}
