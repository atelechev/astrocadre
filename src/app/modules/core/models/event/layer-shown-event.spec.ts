import { LayerShownEvent } from '#core/models/event/layer-shown-event';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { SkyGridLayerFactory } from '#core/models/layers/factories/sky-grid-layer-factory';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';

describe('LayerShownEvent', () => {

  it('should have the expected key', () => {
    const factory = new SkyGridLayerFactory(mockedLayers.subLayers[0], new AxialCurvesFactory());
    const layer = factory.buildRenderableLayer();
    const event = new LayerShownEvent(layer);
    expect(event.key).toEqual('layerShown');
  });

  it('should throw the expected error if the layer arg is falsy', () => {
    expect(() => new LayerShownEvent(undefined)).toThrowError('The data for layerShown event must be defined.');
  });

});
