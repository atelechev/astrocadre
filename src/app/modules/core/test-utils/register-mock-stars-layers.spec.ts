import { Layer } from '#core/models/layer';
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
