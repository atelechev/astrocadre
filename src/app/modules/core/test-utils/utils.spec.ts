import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { LayerService } from '#core/services/layer.service';

export const getSubRenderables = (code: string, layerService: LayerService): Array<RenderableLayer> =>
  layerService.getRenderableLayer(code)
    .subLayers
    .map((subLayer: Layer) => layerService.getRenderableLayer(subLayer.code));
