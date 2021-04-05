import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { LayerService } from '#core/services/layer.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';

export const registerMockStarsLayers = (layerService: LayerService): void => {
  const starsLayerModel = mockedLayers.subLayers[1];
  [
    starsLayerModel,
    starsLayerModel.subLayers[0],
    starsLayerModel.subLayers[1],
    starsLayerModel.subLayers[2]
  ].forEach(
    (layer: Layer) => layerService.registerLayer(layer)
  );
};

export const getSubRenderables = (code: string, layerService: LayerService): Array<RenderableLayer> =>
  layerService.getRenderableLayer(code)
    .subLayers
    .map((subLayer: Layer) => layerService.getRenderableLayer(subLayer.code));
