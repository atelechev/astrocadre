import { LayerEvent } from '#core/models/event/layer-event';
import { RenderableLayer } from '#core/models/layers/renderable-layer';

/**
 * This event is emitted when a renderable layer is shown.
 */
export class LayerShownEvent extends LayerEvent<RenderableLayer> {

  public static readonly KEY = 'layerShown';

  constructor(layer: RenderableLayer) {
    super(LayerShownEvent.KEY, layer);
    this.ensureDataDefined(layer);
  }

}
