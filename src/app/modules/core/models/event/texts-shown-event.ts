import { LayerEvent } from '#core/models/event/layer-event';
import { RenderableLayer } from '#core/models/layers/renderable-layer';

/**
 * This event is emitted when the texts of a renderable layer are shown.
 */
export class TextsShownEvent extends LayerEvent<RenderableLayer> {

  public static readonly KEY = 'textsShown';

  constructor(layer: RenderableLayer) {
    super(TextsShownEvent.KEY, layer);
    this.ensureDataDefined(layer);
  }

}
