import { LayerEvent } from '#core/models/event/layer-event';
import { RenderableLayer } from '#core/models/layers/renderable-layer';


export class TextsHiddenEvent extends LayerEvent<RenderableLayer> {

  public static readonly KEY = 'textsHidden';

  constructor(layer: RenderableLayer) {
    super(TextsHiddenEvent.KEY, layer);
    this.ensureDataDefined(layer);
  }

}
