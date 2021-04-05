import { LayerEvent } from '#core/models/event/layer-event';
import { RenderableLayer } from '#core/models/layers/renderable-layer';

/**
 * This event is emitted when a renderable layer is hidden.
 */
export class LayerHiddenEvent extends LayerEvent<RenderableLayer> {

  public static readonly KEY = 'layerHidden';

  constructor(layer: RenderableLayer) {
    super(LayerHiddenEvent.KEY, layer);
    this.ensureDataDefined(layer);
  }

}
