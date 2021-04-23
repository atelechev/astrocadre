import { Type } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { LayerAware } from '#core/models/layers/layer-aware';
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

  /**
   * Returns the reference to the type of the component that implements the UI controls
   * for the specified layer.
   *
   * If there is no specific UI controls component for this layer, returns undefined.
   *
   * @param model the layer to retrieve the component reference type for.
   */
  getUiControlsComponentType(model: Layer): Type<LayerAware>;

  // TODO add a getter for the layer code? (would allow to get rid of SupportedLayers)

}
