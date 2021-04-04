import { LayerEvent } from '#core/models/event/layer-event';
import { RenderableLayer } from '#core/models/layers/renderable-layer';


export class LayerHiddenEvent extends LayerEvent<RenderableLayer> {

  public static readonly KEY = 'layerHidden';

  constructor(layer: RenderableLayer) {
    super(LayerHiddenEvent.KEY, layer);
    this.ensureDataDefined(layer);
  }

}
