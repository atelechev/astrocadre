import { Type } from '@angular/core';
import { LayerAware } from '#core/models/layers/layer-aware';
import { RenderableLayer } from '#core/models/layers/renderable-layer';

/**
 * Provides methods to access renderable layers and related objects.
 */
export interface LayerProvider {

  /**
   * The code of the maint layer managed by this provider.
   */
  code: string;

  /**
   * Returns the renderable layer corresponding to the specified code.
   *
   * @param code optional code of the sub-layer to retrieve.
   */
  getRenderableLayer(code?: string): Promise<RenderableLayer>;

  /**
   * Returns the reference to the type of the component that implements the UI controls
   * for the specified layer.
   *
   * If there is no specific UI controls component for this layer, returns undefined.
   *
   * @param code optional code of the sub-layer to retrieve the component reference type for.
   */
  getUiControlsComponentType(code?: string): Type<LayerAware>;

}
