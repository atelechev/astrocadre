import { LayerEvent } from '#core/models/event/layer-event';
import { RenderableLayer } from '#core/models/layers/renderable-layer';

/**
 * This event is emitted when the texts of a renderable layer are hidden.
 */
export class TextsHiddenEvent extends LayerEvent<RenderableLayer> {

  public static readonly KEY = 'textsHidden';

  constructor(layer: RenderableLayer) {
    super(TextsHiddenEvent.KEY, layer);
    this.ensureDataDefined(layer);
  }

}
