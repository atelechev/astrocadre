import { RenderableLayer } from '#core/models/layers/renderable-layer';

/**
 * Provides a method allowing to build a RenderableLayer.
 */
export interface LayerFactory {

  /**
   * Creates and returns a new renderable layer.
   *
   * @returns RenderableLayer a new layer instance.
   */
  buildRenderableLayer(): RenderableLayer;

}
